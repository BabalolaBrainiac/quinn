import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomDesignForm } from "@/components/custom/CustomDesignForm";

export default function CustomDesignPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="border-b border-border py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold">Bespoke</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="font-display text-5xl md:text-6xl font-light text-foreground">
                Custom Design
              </h1>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                Describe your vision. Upload references. Quinn will review your request
                personally and send a quote within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Process steps */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1c1c1c]">
            {[
              { step: "1", label: "Submit your concept", desc: "Describe design, placement & style." },
              { step: "2", label: "Quinn reviews & quotes", desc: "Expect a response within 24h." },
              { step: "3", label: "Pay & book", desc: "Receive a secure payment link via email." },
            ].map((item) => (
              <div key={item.step} className="bg-background px-6 py-4 flex items-start gap-4">
                <span className="font-display text-2xl text-muted-foreground">{item.step}</span>
                <div>
                  <p className="text-sm text-foreground mb-0.5">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-12">
          <CustomDesignForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
