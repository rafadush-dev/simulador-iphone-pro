"use client"

import { useState, useCallback } from "react"

const INTEREST_RATES: Record<number, number> = {
  1: 3.09,
  2: 4.78,
  3: 5.64,
  4: 6.50,
  5: 7.37,
  6: 8.25,
  7: 9.11,
  8: 10.01,
  9: 10.89,
  10: 11.78,
  11: 12.68,
  12: 13.59,
  13: 19.13,
  14: 20.14,
  15: 21.14,
  16: 22.13,
  17: 23.12,
  18: 24.15,
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/\D/g, "")
  return Number(cleaned) / 100
}

function formatInputValue(value: number): string {
  if (value === 0) return ""
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default function Home() {
  const [productValue, setProductValue] = useState<number>(0)
  const [installments, setInstallments] = useState<number>(12)

  const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const numericValue = parseCurrencyInput(rawValue)
    setProductValue(numericValue)
  }, [])

  const rate = INTEREST_RATES[installments] / 100
  const totalAmount = productValue * (1 + rate)
  const installmentValue = totalAmount / installments

  const generateWhatsAppMessage = () => {
    const message = `Olá! Vim do simulador da RS iPhones.

Simulei:
Valor do produto: ${formatCurrency(productValue)}
Parcelamento: ${installments}x de ${formatCurrency(installmentValue)}
Total no cartão: ${formatCurrency(totalAmount)}

Gostaria de finalizar minha compra.`
    
    return encodeURIComponent(message)
  }

  const whatsappLink = `https://wa.me/5521969014006?text=${generateWhatsAppMessage()}`

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-5 py-4 max-w-lg mx-auto">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            RS iPhones
          </h1>
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://instagram.com/rs_iphones_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/5521969014006"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-5 py-8 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
            Simulador de Parcelamento
          </h2>
          <p className="text-muted-foreground text-sm">
            Calcule o valor das parcelas do seu iPhone
          </p>
        </div>

        {/* Simulator Card */}
        <div className="bg-card rounded-2xl p-6 border border-border space-y-6">
          {/* Product Value Input */}
          <div className="space-y-2">
            <label htmlFor="productValue" className="block text-sm font-medium text-muted-foreground">
              Valor do Produto
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                R$
              </span>
              <input
                id="productValue"
                type="text"
                inputMode="numeric"
                placeholder="0,00"
                value={formatInputValue(productValue)}
                onChange={handleValueChange}
                className="w-full bg-input border border-border rounded-xl py-4 pl-12 pr-4 text-lg font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Installments Select */}
          <div className="space-y-2">
            <label htmlFor="installments" className="block text-sm font-medium text-muted-foreground">
              Parcelas
            </label>
            <select
              id="installments"
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value))}
              className="w-full bg-input border border-border rounded-xl py-4 px-4 text-lg font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "1.25rem",
              }}
            >
              {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}x
                </option>
              ))}
            </select>
          </div>

          {/* Results */}
          {productValue > 0 && (
            <div className="pt-4 border-t border-border space-y-4">
              {/* Installment Value - Highlighted */}
              <div className="bg-primary/10 rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Parcelamento</p>
                <p className="text-2xl font-bold text-primary">
                  {installments}x de {formatCurrency(installmentValue)}
                </p>
              </div>

              {/* Product Value */}
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Valor do Produto</span>
                <span className="font-medium text-foreground">{formatCurrency(productValue)}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-2 border-t border-border">
                <span className="text-muted-foreground">Total no Cartão</span>
                <span className="font-semibold text-lg text-foreground">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Button */}
        {productValue > 0 && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold py-4 px-6 rounded-xl transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar no WhatsApp
          </a>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            RS iPhones - Parcelamento via cartão de crédito
          </p>
        </footer>
      </div>
    </main>
  )
}
