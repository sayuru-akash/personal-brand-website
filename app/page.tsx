export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="max-w-content mx-auto px-4 py-16">
        {/* Test heading with custom typography */}
        <h1 className="text-6xl font-bold tracking-tighter text-neutral-900 mb-4">
          Tailwind CSS v4 Configuration
        </h1>
        
        {/* Japanese text test */}
        <p className="japanese-text text-japanese-base text-neutral-600 mb-8">
          サユル アーカーシュ
        </p>
        
        {/* Color palette test */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Neutrals (90%) */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Neutrals (90%)</h2>
            <div className="h-12 bg-neutral-50 border border-neutral-200 rounded flex items-center justify-center text-sm">
              neutral-50
            </div>
            <div className="h-12 bg-neutral-200 rounded flex items-center justify-center text-sm">
              neutral-200
            </div>
            <div className="h-12 bg-neutral-500 rounded flex items-center justify-center text-sm text-white">
              neutral-500
            </div>
            <div className="h-12 bg-neutral-900 rounded flex items-center justify-center text-sm text-white">
              neutral-900
            </div>
          </div>
          
          {/* Muted tones (8%) */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Muted Tones (8%)</h2>
            <div className="h-12 bg-muted-stone rounded flex items-center justify-center text-sm text-white">
              muted-stone
            </div>
            <div className="h-12 bg-muted-slate rounded flex items-center justify-center text-sm text-white">
              muted-slate
            </div>
            <div className="h-12 bg-muted-zinc rounded flex items-center justify-center text-sm text-white">
              muted-zinc
            </div>
          </div>
          
          {/* Accent (2%) */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Accent (2%)</h2>
            <div className="h-12 bg-accent-light rounded flex items-center justify-center text-sm text-white">
              accent-light
            </div>
            <div className="h-12 bg-accent rounded flex items-center justify-center text-sm text-white">
              accent
            </div>
            <div className="h-12 bg-accent-dark rounded flex items-center justify-center text-sm text-white">
              accent-dark
            </div>
          </div>
        </div>
        
        {/* Asymmetric offset test */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Asymmetric Offsets</h2>
          <div className="space-y-4">
            <div className="offset-xs bg-neutral-200 p-4 rounded">offset-xs (8px)</div>
            <div className="offset-md bg-neutral-200 p-4 rounded">offset-md (16px)</div>
            <div className="offset-xl bg-neutral-200 p-4 rounded">offset-xl (32px)</div>
          </div>
        </div>
        
        {/* Glass effect test */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Glass Effect</h2>
          <div className="relative h-48 bg-gradient-to-br from-accent-light to-accent rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-effect p-8 rounded-lg">
                <p className="text-white font-semibold">Glass Effect Card</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Typography scale test */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Typography Scale</h2>
          <div className="space-y-2">
            <p className="text-xs">Extra Small (xs)</p>
            <p className="text-sm">Small (sm)</p>
            <p className="text-base">Base</p>
            <p className="text-lg">Large (lg)</p>
            <p className="text-xl">Extra Large (xl)</p>
            <p className="text-2xl">2XL</p>
            <p className="text-4xl tracking-tighter">4XL Display</p>
          </div>
        </div>
        
        {/* Animation test */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Animations</h2>
          <div className="flex gap-8">
            <div className="w-24 h-24 bg-accent rounded-lg animate-float flex items-center justify-center text-white text-sm">
              Float
            </div>
            <div className="w-24 h-24 bg-accent rounded-lg animate-pulse-slow flex items-center justify-center text-white text-sm">
              Pulse
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
