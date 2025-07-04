export const roundTwoDecimals = (value: number) => {
  if (typeof value === 'number') {
    //The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1 that is representable as a Number value, which is approximately: 2.2204460492503130808472633361816 x 10‍−‍16.
    //use to avoid errors when rounding , just how computers work
    //following logic ==> ex: 12.345*100=1234.5, then when we round we get 1235, we then divede by  100 so we get 12.35; so this is just a little trick to make life easier :)
    return Math.round((value + Number.EPSILON) * 100) / 100
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100
  } else {
    throw new Error('value is not a number or a string :(')
  }
}
