"use client";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (lat: number, lng: number) => void;
  initialLat: number;
  initialLng: number;
}

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapModal({
  isOpen,
  onClose,
  onLocationSelect,
  initialLat,
  initialLng,
}: MapModalProps) {
  const [position, setPosition] = useState<[number, number]>([
    initialLat,
    initialLng,
  ]);

  function LocationSelector() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select Location on Map</DialogTitle>
        </DialogHeader>

        <div className="h-[400px] rounded overflow-hidden">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={position} icon={markerIcon}>
              <Popup>
                Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
              </Popup>
            </Marker>

            <LocationSelector />
          </MapContainer>
        </div>

        <Button
          className="mt-4"
          onClick={() => {
            onLocationSelect(position[0], position[1]);
            onClose();
          }}
        >
          Confirm Location
        </Button>
      </DialogContent>
    </Dialog>
  );
}
