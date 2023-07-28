import React, { useState } from "react";
import styled from "styled-components";
import colorConvert from "color-convert";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const Resistor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.isFiveBand ? "250px" : "200px")};
  height: 60px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Band = styled.div`
  width: ${(props) => (props.isFiveBand ? "16%" : "20%")};
  height: 100%;
  background-color: ${(props) => props.color};
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 5px;
`;

const CalculateButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const Result = styled.div`
  font-size: 24px;
  margin-top: 20px;
`;

const ResistorCalculator = () => {
  const colors = [
    "black",
    "brown",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "violet",
    "gray",
    "white",
  ];

  const [isFiveBand, setIsFiveBand] = useState(false);
  const [band1Color, setBand1Color] = useState("black");
  const [band2Color, setBand2Color] = useState("black");
  const [band3Color, setBand3Color] = useState("black");
  const [band4Color, setBand4Color] = useState("brown");
  const [band5Color, setBand5Color] = useState("black");
  const [resistorValue, setResistorValue] = useState("");

  const calculateResistance = () => {
    const band1Value = colors.indexOf(band1Color);
    const band2Value = colors.indexOf(band2Color);
    const band3Multiplier = Math.pow(10, colors.indexOf(band3Color));

    if (isFiveBand) {
      const band4Value = colors.indexOf(band4Color);
      const toleranceValue = colors.indexOf(band5Color);

      if (
        band1Value > -1 &&
        band2Value > -1 &&
        band3Multiplier > -1 &&
        band4Value > -1 &&
        toleranceValue > -1
      ) {
        const resistance =
          (band1Value * 100 + band2Value * 10 + band4Value) * band3Multiplier;
        setResistorValue(`${resistance} ohms, ${toleranceValue}% tolerance`);
      }
    } else {
      const toleranceValue = colors.indexOf(band4Color);

      if (
        band1Value > -1 &&
        band2Value > -1 &&
        band3Multiplier > -1 &&
        toleranceValue > -1
      ) {
        const resistance = (band1Value * 10 + band2Value) * band3Multiplier;
        setResistorValue(`${resistance} ohms, ${toleranceValue}% tolerance`);
      }
    }
  };

  return (
    <Container>
      <Resistor isFiveBand={isFiveBand}>
        <Band color={band1Color} isFiveBand={isFiveBand} />
        <Band color={band2Color} isFiveBand={isFiveBand} />
        <Band color={band3Color} isFiveBand={isFiveBand} />
        {isFiveBand && <Band color={band4Color} isFiveBand={isFiveBand} />}
        <Band color={band5Color} isFiveBand={isFiveBand} />
      </Resistor>
      <div>
        <Label>Band 1:</Label>
        <Select
          value={band1Color}
          onChange={(e) => setBand1Color(e.target.value)}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Select>
        <Label>Band 2:</Label>
        <Select
          value={band2Color}
          onChange={(e) => setBand2Color(e.target.value)}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Select>
        <Label>Multiplier:</Label>
        <Select
          value={band3Color}
          onChange={(e) => setBand3Color(e.target.value)}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Select>
        {isFiveBand && (
          <>
            <Label>Multiplier 2:</Label>
            <Select
              value={band4Color}
              onChange={(e) => setBand4Color(e.target.value)}
            >
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </Select>
          </>
        )}
        <Label>Tolerance:</Label>
        <Select
          value={isFiveBand ? band5Color : band4Color}
          onChange={(e) =>
            isFiveBand
              ? setBand5Color(e.target.value)
              : setBand4Color(e.target.value)
          }
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Resistor Type:</Label>
        <Select
          value={isFiveBand ? "5-band" : "4-band"}
          onChange={(e) => setIsFiveBand(e.target.value === "5-band")}
        >
          <option value="4-band">4-band</option>
          <option value="5-band">5-band</option>
        </Select>
      </div>
      <CalculateButton onClick={calculateResistance}>
        Calculate Resistance
      </CalculateButton>
      {resistorValue && <Result>Resistance: {resistorValue}</Result>}
    </Container>
  );
};

export default ResistorCalculator;
