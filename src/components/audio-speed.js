import InputRange from "react-input-range";

export default function AudioSpeed({
  onChange = () => {},
  max = 2.9,
  min = 0.1,
  step = 0.1,
  value = 1,
}) {
  return (
    <div className="component">
      <div className="text">Audio speed</div>

      <InputRange
        maxValue={max}
        minValue={min}
        onChange={onChange}
        step={step}
        value={Number(value)}
      />

      <style jsx>{`
        .component {
          margin: 0 auto;
          width: 250px;
        }

        .text {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
