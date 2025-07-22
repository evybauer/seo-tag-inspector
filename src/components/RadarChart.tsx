'use client';

interface RadarChartProps {
  data: {
    name: string;
    score: number;
    color: string;
  }[];
  size?: number;
}

export default function RadarChart({ data, size = 200 }: RadarChartProps) {
  const center = size / 2;
  const radius = (size * 0.35);
  const numPoints = data.length;
  const angleStep = (2 * Math.PI) / numPoints;

  // Generate polygon points for the radar chart
  const generatePolygonPoints = (values: number[], scale: number) => {
    return values.map((value, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const distance = (value / 100) * radius * scale;
      const x = center + distance * Math.cos(angle);
      const y = center + distance * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // Generate axis lines
  const generateAxisLines = () => {
    return data.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return (
        <line
          key={`axis-${index}`}
          x1={center}
          y1={center}
          x2={x}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      );
    });
  };

  // Generate concentric circles
  const generateCircles = () => {
    const circles = [];
    for (let i = 1; i <= 5; i++) {
      const r = (radius * i) / 5;
      circles.push(
        <circle
          key={`circle-${i}`}
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      );
    }
    return circles;
  };

  // Generate labels
  const generateLabels = () => {
    return data.map((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const labelRadius = radius + 20;
      const x = center + labelRadius * Math.cos(angle);
      const y = center + labelRadius * Math.sin(angle);
      
      // Adjust text anchor and alignment based on position
      let textAnchor = 'middle';
      let dominantBaseline = 'middle';
      
      if (Math.abs(Math.cos(angle)) > 0.7) {
        textAnchor = Math.cos(angle) > 0 ? 'start' : 'end';
      }
      if (Math.abs(Math.sin(angle)) > 0.7) {
        dominantBaseline = Math.sin(angle) > 0 ? 'hanging' : 'auto';
      }

      return (
        <text
          key={`label-${index}`}
          x={x}
          y={y}
          textAnchor={textAnchor}
          dominantBaseline={dominantBaseline}
          className="text-xs font-medium fill-gray-600"
        >
          {item.name}
        </text>
      );
    });
  };

  const scores = data.map(item => item.score);
  const primaryColor = data[0]?.color || '#3b82f6';

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circles */}
        {generateCircles()}
        
        {/* Axis lines */}
        {generateAxisLines()}
        
        {/* Data polygon */}
        <polygon
          points={generatePolygonPoints(scores, 1)}
          fill={`${primaryColor}20`}
          stroke={primaryColor}
          strokeWidth="2"
          fillOpacity="0.3"
        />
        
        {/* Data points */}
        {scores.map((score, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const distance = (score / 100) * radius;
          const x = center + distance * Math.cos(angle);
          const y = center + distance * Math.sin(angle);
          
          return (
            <circle
              key={`point-${index}`}
              cx={x}
              cy={y}
              r="4"
              fill={primaryColor}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
        
        {/* Labels */}
        {generateLabels()}
        
        {/* Center point */}
        <circle
          cx={center}
          cy={center}
          r="3"
          fill={primaryColor}
        />
      </svg>
    </div>
  );
} 