import styled from "@emotion/styled";

interface PokeNameChip {
  name: string;
  id: number;
  color: string;
}

const PokeNameChip = (props: PokeNameChip) => {
  return (
    <Chip>
      <Number color={props.color}>{String(props.id).padStart(3, "0")}</Number>
      <Text>{props.name}</Text>
    </Chip>
  );
};

const Chip = styled.div`
  display: flex;
  align-items: center;

  border: 1px solid #c0c0c0;
  border-radius: 16px;

  font-size: 15px;
  font-weight: bold;
  box-shadow: 0.5px 0.5px 0 0 #c0c0c0;
`;

const Number = styled.div<{ color: string }>`
  padding: 2px 6px 3px;
  background-color: ${(props) => props.color};
  border-radius: 16px;
  opacity: 0.8;
`;

const Text = styled.label`
  margin: 1px 8px 0 5px;
  padding-bottom: 2px;
`;

export default PokeNameChip;
