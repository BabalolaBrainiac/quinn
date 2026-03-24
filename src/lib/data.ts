import { Design, AvailableDay, Booking, CustomDesignRequest } from "./types";
import { addDays, format } from "date-fns";

export const designs: Design[] = [
  {
    id: "d1",
    title: "Sacred Geometry",
    category: "geometric",
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,geometric,mandala,blackink&sig=101",
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
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,floral,botanical,fineline&sig=102",
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
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,blackwork,serpent,bold&sig=103",
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
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,minimal,fineline,celestial&sig=104",
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
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,abstract,artistic,ink&sig=105",
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
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,tribal,bold,pattern&sig=106",
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
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,watercolor,colorful,floral&sig=107",
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
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,fineline,portrait,realistic&sig=108",
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
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,ornamental,geometric,neck&sig=109",
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
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,koi,minimal,japanese&sig=110",
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
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,blackwork,gothic,dark&sig=111",
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
    imageUrl: "https://source.unsplash.com/600x800/?tattoo,phoenix,bird,abstract&sig=112",
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
