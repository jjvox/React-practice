export default function generateRnadomNumber() {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const pickNumber = shuffle(candidates).splice(0, 4);

  return pickNumber;
}

function shuffle(array) {
  return array.sort(() => {
    return Math.random() - 0.5;
  });
}
