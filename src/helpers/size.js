export const vw = (percent) => {
  return window.innerWidth * (percent / 100);
}

export const vh = (percent) => {
  return window.innerHeight * (percent / 100);
}

export const symbolWidth = () => {
  if (vw(100) < 500) {
    return vw(100) / 5;
  } else if (vw(100) > 500 && vw(100) < 900) {
    return 120;
  } else {
    return 160;
  }
}
