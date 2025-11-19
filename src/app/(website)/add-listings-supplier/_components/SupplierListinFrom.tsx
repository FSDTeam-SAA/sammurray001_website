'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import MapModal from './MapModal'
import { useSession } from 'next-auth/react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SupplierListingFormData {
  propertyName: string
  country: string
  city: string
  propertyType: string
  areaSuburb: string
  exactAddress: string
  approxSize: string
  indicativeRentFrom: string
  month: string
  description: string
}
interface PropertyType {
  name: string,
  _id: string
}

export function SupplierListingForm() {
  const { data: session, status } = useSession()
  const token = session?.user?.accessToken as string | undefined

  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null) 
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SupplierListingFormData>({
    defaultValues: {
      propertyName: '',
      country: '',
      city: '',
      propertyType: '',
      areaSuburb: '',
      exactAddress: '',
      approxSize: '',
      indicativeRentFrom: '',
      month: '',
      description: '',
    },
  })

 

  // Fetch Property Types
  const { data: propertyTypes = [], isLoading: isPropertyTypesLoading } = useQuery({
    queryKey: ['propertyTypes'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/propertytype/`)
      if (!res.ok) throw new Error('Failed to fetch property types')
      const json = await res.json()
      return json.data || []
    },
  })

  // Submit Mutation - Using FormData (Exactly like Postman)
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/property`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type — let browser set multipart boundary
        },
        body: formData,
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Failed to add listing')
      }

      return result
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Property added successfully!')
      reset()
      setUploadedImage(null)
      setUploadedImageFile(null)
      setSelectedLocation(null)
    },
    //eslint-disable-next-line
    onError: (error: any) => {
      toast.error(error.message || 'Upload failed. Please try again.')
    },
  })

  const onSubmit = (data: SupplierListingFormData) => {
    if (status === 'loading') {
      toast.error('Authentication loading...')
      return
    }

    if (!token) {
      toast.error('You must be logged in!')
      return
    }

    const formData = new FormData()

    // Build clean payload
    const payload = {
      type: data.propertyType,
      title: data.propertyName,
      description: data.description || undefined,
      country: data.country,
      city: data.city,
      areaya: data.areaSuburb || undefined,
      address: data.exactAddress || data.areaSuburb || undefined,
      size: data.approxSize ? `${data.approxSize.trim()} sqft` : undefined,
      price: data.indicativeRentFrom ? Number(data.indicativeRentFrom) : 0,
      mounth: data.month || undefined,
      extraLocation: selectedLocation
        ? {
            type: 'Point',
            coordinates: [selectedLocation.lng, selectedLocation.lat],
          }
        : undefined,
    }

    // Remove undefined fields
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([ v]) => v !== undefined)
    )

    // Append as JSON string under "data" key
    formData.append('data', JSON.stringify(cleanPayload))

    // Append image file if exists
    if (uploadedImageFile) {
      formData.append('thumble', uploadedImageFile, uploadedImageFile.name)
    }

    console.log('FormData sent:', formData)
    mutation.mutate(formData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB')
      return
    }

    setUploadedImageFile(file)

    const reader = new FileReader()
    reader.onload = (ev) => {
      setUploadedImage(ev.target?.result as string)
    }
    reader.readAsDataURL(file)

    toast.success('Image selected – ready to upload!')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a2745] to-[#0a1428]">
        <p className="text-white text-xl">Loading session...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2745] via-[#0f1f3f] to-[#0a1428] p-4 md:p-8">
      <div className="mx-auto container ">
        <Card className="border-none bg-white/10  backdrop-blur-lg p-6 md:p-10 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Add New Property Listing</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

            {/* Property Name */}
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Property Name *</label>
              <Input
                {...register('propertyName', { required: 'Required' })}
                placeholder="Property Name"
                className="h-12  border border-[#BFBFBF] text-white placeholder-gray-400"
              />
              {errors.propertyName && <p className="text-red-400 text-xs mt-1">{errors.propertyName.message}</p>}
            </div>

            {/* Country & City */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Country</label>
                <Input {...register('country')} className="h-12  border border-[#BFBFBF] text-white" placeholder="Country" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">City</label>
                <Input {...register('city')} className="h-12  border border-[#BFBFBF] text-white"  placeholder="City"/>
              </div>
            </div>

            {/* Property Type & Area */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Property Type *</label>
                <Select onValueChange={(val) => setValue('propertyType', val)} disabled={isPropertyTypesLoading}>
                  <SelectTrigger className="h-12  border border-[#BFBFBF] text-white">
                    <SelectValue placeholder={isPropertyTypesLoading ? 'Loading...' : 'Select Type'} />
                  </SelectTrigger>
                  <SelectContent>
                    
                    {propertyTypes.map((type: PropertyType) => (
                      <SelectItem key={type._id} value={type._id}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Area / Suburb</label>
                <Input {...register('areaSuburb')} placeholder="Area / Suburb" className="h-12  border border-[#BFBFBF] text-white" />
              </div>
            </div>

            {/* Address & Map */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Exact Address (Optional)</label>
                <Input {...register('exactAddress')} placeholder="Exact Address" className="h-12  border border-[#BFBFBF] text-white" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Location on Map</label>
                <Button type="button" className="w-full h-12 bg-gradient hover:bg-gradient/80" onClick={() => setIsMapOpen(true)}>
                  {selectedLocation ? 'Change Location' : 'Pick Location'}
                </Button>
                {selectedLocation && (
                  <p className="mt-2 text-green-400 text-xs">
                    Selected: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </p>
                )}
              </div>
            </div>

            {/* Size & Rent */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Size (sqft)</label>
                <Input {...register('approxSize')} placeholder="size" className="h-12  border border-[#BFBFBF] text-white" />
              </div>
              <div>
                <label className="text-sm font-semibold text-white mb-2 block">Monthly Rent (BDT)</label>
                <Input {...register('indicativeRentFrom')} type="number" placeholder="Monthly Rent" className="h-12  border border-[#BFBFBF] text-white" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Available From</label>
              <Input {...register('month')} placeholder="Available From" className="h-12  border border-[#BFBFBF] text-white" />
            </div>

            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Description</label>
              <Textarea
                {...register('description')}
                rows={5}
                placeholder="Description..."
                className=" border border-[#BFBFBF] text-white placeholder-gray-400"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-semibold text-white mb-2 block">Property Image (Thumbnail)</label>
              <div className="relative border-2 border-dashed border-white/30 rounded-xl p-10 text-center hover:border-cyan-400 transition">
                {uploadedImage ? (
                  <div className="relative">
                    <Image src={uploadedImage} alt="Thumbnail" width={800} height={400} className="mx-auto rounded-lg max-h-80 object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImage(null)
                        setUploadedImageFile(null)
                      }}
                      className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-16 w-16 text-cyan-400 mb-4" />
                    <p className="text-gray-300 text-lg">Click to upload</p>
                    <p className="text-xs text-gray-400 mt-2">Max 10MB • JPG, PNG</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-gradient hover:bg-gradient/80 text-white rounded-xl shadow-xl"
              disabled={mutation.isPending || !token}
            >
              {mutation.isPending ? 'Uploading...' : 'Add Property Listing'}
            </Button>
          </form>
        </Card>

        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          initialLat={23.8103}
          initialLng={90.4125}
          onLocationSelect={(lat, lng) => {
            setSelectedLocation({ lat, lng })
            toast.success('Location selected!')
          }}
        />
      </div>
    </div>
  )
}