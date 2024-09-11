import React, { useState } from "react";
import cronParser from "cron-parser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Tipos para los días de la semana
type DayOfWeek = {
  label: string;
  value: string;
};

// Días de la semana (según la especificación cron)
const daysOfWeek: DayOfWeek[] = [
  { label: "Lunes", value: "1" },
  { label: "Martes", value: "2" },
  { label: "Miércoles", value: "3" },
  { label: "Jueves", value: "4" },
  { label: "Viernes", value: "5" },
  { label: "Sábado", value: "6" },
  { label: "Domingo", value: "0" }, // En cron, domingo es 0
];

const CronGenerator: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string>("00:00");
  const [cronExpression, setCronExpression] = useState<string>("* * * * *");
  const [inputCron, setInputCron] = useState<string>("");

  // Maneja la selección de días
  const handleDayToggle = (dayValue: string): void => {
    setSelectedDays((prevState) =>
      prevState.includes(dayValue) ? prevState.filter((day) => day !== dayValue) : [...prevState, dayValue]
    );
  };

  // Maneja el cambio en la hora inicial
  const handleTimeChange = (value: string): void => {
    setStartTime(value);
  };

  // Genera la expresión cron basada en la selección del usuario
  const generateCronExpression = (): void => {
    const [hours, minutes] = startTime.split(":");
    const cronDaysOfWeek = selectedDays.length > 0 ? selectedDays.join(",") : "*";
    const newCron = `${minutes} ${hours} * * ${cronDaysOfWeek}`;

    setCronExpression(newCron);
  };

  // Parsear la expresión cron para mostrar los siguientes tiempos de ejecución
  const parseCronExpression = (): string[] => {
    try {
      const interval = cronParser.parseExpression(cronExpression);
      const nextExecutions: string[] = [];
      for (let i = 0; i < 5; i++) {
        nextExecutions.push(interval.next().toString());
      }
      return nextExecutions;
    } catch (err) {
      return ["Expresión cron inválida"];
    }
  };

  // Parsear la expresión cron introducida por el usuario
  const populateFromCronInput = (): void => {
    try {
      const [cronMinutes, cronHours, , , cronDaysOfWeek] = inputCron.split(" ");

      // Actualiza la hora de inicio
      setStartTime(`${cronHours.padStart(2, "0")}:${cronMinutes.padStart(2, "0")}`);

      // Actualiza los días seleccionados
      if (cronDaysOfWeek === "*") {
        setSelectedDays([]);
      } else {
        setSelectedDays(cronDaysOfWeek.split(","));
      }
    } catch (error) {
      alert("Expresión cron inválida");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Generador de Cron personalizado</h3>

      {/* Input para ingresar una expresión cron */}
      <div>
        <Input
          placeholder="Introduce una expresión cron"
          value={inputCron}
          onChange={(e) => setInputCron(e.target.value)}
        />
        <Button onClick={populateFromCronInput}>Aplicar Expresión Cron</Button>
      </div>

      {/* Selección de días */}
      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {daysOfWeek.map(({ label, value }) => (
          <div key={value}>
            <Label>
              <Checkbox checked={selectedDays.includes(value)} onChange={() => handleDayToggle(value)} />
              {label}
            </Label>
          </div>
        ))}
      </div>

      {/* Selección de hora (hora inicial) */}
      <div style={{ marginTop: "20px" }}>
        <Label>
          Hora de ejecución:
          <Input type="time" value={startTime} onChange={(e) => handleTimeChange(e.target.value)} />
        </Label>
      </div>

      {/* Botón para generar la expresión cron */}
      <div style={{ marginTop: "20px" }}>
        <Button onClick={generateCronExpression}>Generar Expresión Cron</Button>
      </div>

      {/* Mostrar la expresión cron generada */}
      <div style={{ marginTop: "20px" }}>
        <Label>Expresión Cron Generada</Label>
        <pre>{cronExpression}</pre>
      </div>

      {/* Parsear y mostrar los próximos tiempos de ejecución */}
      <div style={{ marginTop: "20px" }}>
        <Label>Próximas ejecuciones</Label>
        <ul>
          {parseCronExpression().map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CronGenerator;
