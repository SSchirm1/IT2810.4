export const calculateAverage =  (studentbyVurdering: number, anmeldelseVurdering: number, size: number) => {
    const number = studentbyVurdering !== null ? (Math.floor(studentbyVurdering) * (size - 1) + anmeldelseVurdering) / size
                    : anmeldelseVurdering;
  return number;
}
