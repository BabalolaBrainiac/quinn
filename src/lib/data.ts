import { Design, AvailableDay, Booking, CustomDesignRequest } from "./types";
import { addDays, format } from "date-fns";

export const designs: Design[] = [
  {
    id: "d1",
    title: "Sacred Geometry",
    category: "geometric",
    // Geometric mandala tattoo on arm
    imageUrl: "https://images.unsplash.com/photo-1559733977-0ca2f6764df5?w=600&q=80&fit=crop",
    description: "Intricate sacred geometry patterns with precise linework. A meditation on mathematical beauty.",
    basePrice: 45000,
    estimatedHours: 3,
    tags: ["geometry", "mandala", "black", "fine-line"],
    source: "original",
    featured: true,
  },
  {
    id: "d2",
    title: "Botanical Whisper",
    category: "floral",
    // Fine line floral tattoo
    imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&q=80&fit=crop",
    description: "Delicate botanical illustrations — leaves, stems, and blooms rendered in fine ink.",
    basePrice: 35000,
    estimatedHours: 2,
    tags: ["floral", "botanical", "fine-line", "minimalist"],
    source: "pinterest",
    featured: true,
  },
  {
    id: "d3",
    title: "Obsidian Serpent",
    category: "blackwork",
    // Blackwork snake tattoo
    imageUrl: "https://images.unsplash.com/photo-1601445638532-3f040a0a3b66?w=600&q=80&fit=crop",
    description: "Bold blackwork serpent design with ornamental detailing. Power and elegance intertwined.",
    basePrice: 65000,
    estimatedHours: 5,
    tags: ["serpent", "blackwork", "bold", "ornamental"],
    source: "original",
    featured: true,
  },
  {
    id: "d4",
    title: "Celestial Arc",
    category: "minimalist",
    // Minimal fine line tattoo wrist/arm
    imageUrl: "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=600&q=80&fit=crop",
    description: "Sun, moon and stars in clean, minimal strokes. A cosmic narrative on skin.",
    basePrice: 25000,
    estimatedHours: 1.5,
    tags: ["celestial", "moon", "stars", "minimal"],
    source: "pinterest",
    featured: false,
  },
  {
    id: "d5",
    title: "Abstract Flow",
    category: "abstract",
    // Abstract tattoo on skin
    imageUrl: "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=600&q=80&fit=crop",
    description: "Fluid abstract shapes that move with the body. An art piece as much as a tattoo.",
    basePrice: 55000,
    estimatedHours: 4,
    tags: ["abstract", "fluid", "artistic"],
    source: "instagram",
    featured: false,
  },
  {
    id: "d6",
    title: "Tribal Heritage",
    category: "tribal",
    // Tribal arm/chest tattoo
    imageUrl: "https://images.unsplash.com/photo-1563985336347-dd0a17e59d0a?w=600&q=80&fit=crop",
    description: "Modern reinterpretation of ancestral tribal patterns. Roots, reimagined.",
    basePrice: 50000,
    estimatedHours: 4,
    tags: ["tribal", "cultural", "bold", "pattern"],
    source: "original",
    featured: false,
  },
  {
    id: "d7",
    title: "Watercolor Bloom",
    category: "watercolor",
    // Colorful watercolor tattoo
    imageUrl: "https://images.unsplash.com/photo-1559656914-a30970c1affd?w=600&q=80&fit=crop",
    description: "Vibrant watercolor-style roses with bleeding ink edges. Color as emotion.",
    basePrice: 70000,
    estimatedHours: 5,
    tags: ["watercolor", "floral", "color", "roses"],
    source: "pinterest",
    featured: false,
  },
  {
    id: "d8",
    title: "Fine Line Portrait",
    category: "fine-line",
    // Fine line detailed tattoo work
    imageUrl: "https://images.unsplash.com/photo-1574695096851-9a36fe3b4d3b?w=600&q=80&fit=crop",
    description: "Hyper-realistic fine line portrait work. Every detail, every shadow, perfectly placed.",
    basePrice: 120000,
    estimatedHours: 8,
    tags: ["portrait", "fine-line", "realistic", "premium"],
    source: "original",
    featured: true,
  },
  {
    id: "d9",
    title: "Ornamental Collar",
    category: "geometric",
    // Ornamental neck/collar tattoo
    imageUrl: "https://images.unsplash.com/photo-1556979096-5b02f6c7bc60?w=600&q=80&fit=crop",
    description: "Ornamental necklace-style collar tattoo with intricate patterning.",
    basePrice: 85000,
    estimatedHours: 6,
    tags: ["ornamental", "collar", "geometric", "decorative"],
    source: "pinterest",
    featured: false,
  },
  {
    id: "d10",
    title: "Minimal Koi",
    category: "minimalist",
    // Minimalist fine-line tattoo
    imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80&fit=crop",
    description: "Single-needle koi fish in minimalist style. Fortune in clean lines.",
    basePrice: 40000,
    estimatedHours: 2.5,
    tags: ["koi", "minimal", "japanese", "fine-line"],
    source: "original",
    featured: false,
  },
  {
    id: "d11",
    title: "Dark Botanica",
    category: "blackwork",
    // Dark blackwork arm tattoo
    imageUrl: "https://images.unsplash.com/photo-1613456151297-bb9dea0af78d?w=600&q=80&fit=crop",
    description: "Dark botanical blackwork — thorns, dead flowers, and gothic botanica.",
    basePrice: 60000,
    estimatedHours: 4.5,
    tags: ["botanical", "blackwork", "gothic", "dark"],
    source: "instagram",
    featured: false,
  },
  {
    id: "d12",
    title: "Phoenix Rising",
    category: "abstract",
    // Large detailed back/arm tattoo piece
    imageUrl: "https://images.unsplash.com/photo-1561494785-dd34f09b0d5e?w=600&q=80&fit=crop",
    description: "A phoenix composition blending realism with illustrative flair. Rebirth, rendered.",
    basePrice: 95000,
    estimatedHours: 7,
    tags: ["phoenix", "bird", "abstract", "statement"],
    source: "original",
    featured: true,
  },
];

const today = new Date();

export const availableDays: AvailableDay[] = [
  {
    date: format(addDays(today, 2), "yyyy-MM-dd"),
    slots: [
      { time: "10:00 AM", available: true },
      { time: "12:00 PM", available: true },
      { time: "2:00 PM", available: false },
      { time: "4:00 PM", available: true },
    ],
  },
  {
    date: format(addDays(today, 3), "yyyy-MM-dd"),
    slots: [
      { time: "11:00 AM", available: true },
      { time: "1:00 PM", available: true },
      { time: "3:00 PM", available: true },
    ],
  },
  {
    date: format(addDays(today, 5), "yyyy-MM-dd"),
    slots: [
      { time: "10:00 AM", available: false },
      { time: "12:00 PM", available: true },
      { time: "2:00 PM", available: true },
      { time: "4:00 PM", available: true },
      { time: "6:00 PM", available: true },
    ],
  },
  {
    date: format(addDays(today, 7), "yyyy-MM-dd"),
    slots: [
      { time: "10:00 AM", available: true },
      { time: "1:00 PM", available: true },
      { time: "3:00 PM", available: true },
      { time: "5:00 PM", available: true },
    ],
  },
  {
    date: format(addDays(today, 9), "yyyy-MM-dd"),
    slots: [
      { time: "11:00 AM", available: true },
      { time: "2:00 PM", available: true },
    ],
  },
  {
    date: format(addDays(today, 12), "yyyy-MM-dd"),
    slots: [
      { time: "10:00 AM", available: true },
      { time: "12:00 PM", available: true },
      { time: "2:00 PM", available: true },
      { time: "4:00 PM", available: true },
    ],
  },
];

export const mockBookings: Booking[] = [
  {
    id: "b1",
    clientName: "Adaeze Okonkwo",
    clientEmail: "adaeze@example.com",
    clientPhone: "08012345678",
    designId: "d1",
    designTitle: "Sacred Geometry",
    serviceType: "studio",
    date: format(addDays(today, 2), "yyyy-MM-dd"),
    time: "10:00 AM",
    placement: "Upper arm",
    size: "Medium (10–15cm)",
    amount: 45000,
    status: "confirmed",
    paystackRef: "PSK_REF_001",
    createdAt: new Date().toISOString(),
  },
  {
    id: "b2",
    clientName: "Emeka Nwosu",
    clientEmail: "emeka@example.com",
    clientPhone: "09087654321",
    designId: "d3",
    designTitle: "Obsidian Serpent",
    serviceType: "home",
    date: format(addDays(today, 3), "yyyy-MM-dd"),
    time: "11:00 AM",
    placement: "Back",
    size: "Large (20–30cm)",
    amount: 80000,
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "b3",
    clientName: "Funmi Adeleke",
    clientEmail: "funmi@example.com",
    clientPhone: "07011223344",
    designId: "d8",
    designTitle: "Fine Line Portrait",
    serviceType: "studio",
    date: format(addDays(today, 5), "yyyy-MM-dd"),
    time: "12:00 PM",
    placement: "Forearm",
    size: "Large (20–30cm)",
    amount: 120000,
    status: "confirmed",
    paystackRef: "PSK_REF_002",
    createdAt: new Date().toISOString(),
  },
];

export const mockCustomRequests: CustomDesignRequest[] = [
  {
    id: "cr1",
    clientName: "Chisom Eze",
    clientEmail: "chisom@example.com",
    clientPhone: "08033445566",
    description: "I want a design combining the Nigerian coat of arms eagle with geometric patterns. Very bold, full sleeve.",
    placement: "Full sleeve",
    size: "Extra Large (30cm+)",
    colorPreference: "Black and grey",
    serviceType: "studio",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "cr2",
    clientName: "Tunde Bakare",
    clientEmail: "tunde@example.com",
    clientPhone: "07022334455",
    description: "Matching couples tattoos — small infinity symbol intertwined with our initials (T & A).",
    placement: "Wrist",
    size: "Small (5–10cm)",
    colorPreference: "Black ink only",
    serviceType: "home",
    status: "quoted",
    quotedAmount: 30000,
    artistNotes: "Beautiful idea. Will do both wrists for ₦30,000 total. Includes aftercare kit.",
    createdAt: new Date().toISOString(),
  },
];

export const HOME_SERVICE_SURCHARGE = 0.3; // 30% surcharge for home service

export function getDesignById(id: string): Design | undefined {
  return designs.find((d) => d.id === id);
}

export function getAvailableDayByDate(date: string): AvailableDay | undefined {
  return availableDays.find((d) => d.date === date);
}

export function calculateTotal(basePrice: number, serviceType: "studio" | "home"): number {
  if (serviceType === "home") {
    return Math.round(basePrice * (1 + HOME_SERVICE_SURCHARGE));
  }
  return basePrice;
}
