// Paystack integration helper
// Replace NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY with your actual Paystack public key in .env.local

export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder";

export interface PaystackConfig {
  email: string;
  amount: number; // in kobo (Naira × 100)
  reference: string;
  currency: "NGN";
  metadata?: Record<string, unknown>;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export function generateReference(prefix = "QA"): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `${prefix}_${timestamp}_${random}`;
}

export function toKobo(naira: number): number {
  return naira * 100;
}

// Inline Paystack popup script loader
export function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();
    if (document.getElementById("paystack-script")) return resolve();

    const script = document.createElement("script");
    script.id = "paystack-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Paystack script"));
    document.head.appendChild(script);
  });
}

export async function initiatePaystackPayment(config: PaystackConfig) {
  await loadPaystackScript();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PaystackPop = (window as any).PaystackPop;
  if (!PaystackPop) throw new Error("Paystack not loaded");

  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: config.email,
    amount: toKobo(config.amount),
    currency: "NGN",
    ref: config.reference,
    metadata: config.metadata,
    callback: (response: { reference: string }) => {
      config.onSuccess(response.reference);
    },
    onClose: config.onClose,
  });

  handler.openIframe();
}
