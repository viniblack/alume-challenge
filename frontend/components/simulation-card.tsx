"use client"

import { Card } from "./ui/card"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { useState, useMemo } from "react"
import { Button } from "./ui/button"
import { simulation } from "@/services/simulation"
import { toast } from "sonner"
import { SimulationRequest } from "@/lib/http/simulationAPI"

export default function SimulationCard() {
  const [amount, setAmount] = useState(5000)
  const [months, setMonths] = useState(6)
  const [loading, setLoading] = useState(false)

  const interestRate = 0.0349 // 3.49% a.m

  // Função de cálculo de parcela com juros compostos (sistema PRICE)
  const monthlyPayment = useMemo(() => {
    const i = interestRate
    const n = months
    const pv = amount
    const payment = (pv * i) / (1 - Math.pow(1 + i, -n))
    return payment
  }, [amount, months, interestRate])

  const totalToPay = useMemo(() => {
    return monthlyPayment * months
  }, [monthlyPayment, months])

  const handleSubmit = async (data: SimulationRequest) => {
    try {
      setLoading(true)
      console.log(data);

      const res = await simulation(data)
      console.log("Register success", res)

      toast.success("Simulação criada com sucesso")
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar a simulação.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-[50vw] h-[50vh] max-w-4xl flex flex-col md:flex-row gap-6 py-0">
      <div className="flex-1 space-y-6 p-7">
        {/* Valor desejado */}
        <div>
          <h2 className="text-md font-bold text-center text-muted-foreground ">Valor desejado</h2>
          <div className="text-4xl font-bold text-center my-4">R$ {amount.toLocaleString("pt-BR")},00</div>
          <Slider
            defaultValue={[5000]}
            min={5000}
            max={50000}
            step={100}
            value={[amount]}
            onValueChange={(val) => setAmount(val[0])}
            className={cn("w-full my-2")}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="text-sm">R$ 5.000</span>
            <span className="text-sm">R$ 50.000</span>
          </div>
        </div>

        {/* Prazo para pagamento */}
        <div>
          <h2 className="text-md font-bold text-center text-muted-foreground">Prazo para pagamento</h2>
          <div className="text-4xl font-bold text-center my-4">{months} meses</div>
          <Slider
            defaultValue={[6]}
            min={6}
            max={36}
            step={1}
            value={[months]}
            onValueChange={(val) => setMonths(val[0])}
            className={cn("w-full my-2")}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="text-sm">6 meses</span>
            <span className="text-sm">36 meses</span>
          </div>
        </div>

        {/* ✅ Botão de envio */}
        <Button onClick={() => handleSubmit({
          totalAmount: amount,
          numberOfInstallments: months,
          monthlyInterestRate: interestRate
        })}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Simulação"}
        </Button>
      </div>

      <div className="flex-1 flex flex-col justify-between items-center bg-muted rounded-md p-7">
        <div>
          <h2 className="text-md font-bold text-center text-muted-foreground pb-3">Parcela mensal</h2>
          <div className="text-4xl font-bold mt-2 pb-5">
            <span className="text-2xl">{months}x de</span> R$
            {monthlyPayment.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="border-t mt-4 pt-3 text-xs text-muted-foreground flex justify-between flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span>Taxa de Juros a.m:</span>
              <span>{(interestRate * 100).toFixed(2)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <p>Valor total de crédito:</p>
              <p>
                R$ {totalToPay.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
