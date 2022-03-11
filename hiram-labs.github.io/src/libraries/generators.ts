/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Random random white dots generator
 *
 * @param HTMLDivElement
 * @param radius
 * @param number
 */
export function generateStars(
  element: HTMLDivElement | null,
  radius = 2.5,
  count = 500
) {
  if (!element) return;
  for (var i = 0; i < count; i++) {
    const arr = [
      getRandomInt(0, element.clientHeight),
      getRandomInt(element.clientHeight + 420, element.clientHeight + 1600)
    ];

    const random = Math.floor(Math.random() * 2);

    const posTop = arr[random];
    const posLeft = getRandomInt(0, element.clientWidth);
    const starSize = getRandomInt(1, 2.5);

    var starDiv = document.createElement('Div');

    starDiv.style.width = `${starSize}px`;
    starDiv.style.height = `${starSize}px`;
    starDiv.style.borderRadius = `${starSize + 1}px`;
    starDiv.style.position = 'absolute';
    starDiv.style.top = `${posTop}px`;
    starDiv.style.left = `${posLeft}px`;
    starDiv.style.background =
      i < 50 ? '#54cae7' : i > 50 && i < 100 ? '#e75480' : '#fbf7f5';
    starDiv.style.animation =
      i < 35
        ? `twinkle ${Math.random() + 2.5}s infinite alternate`
        : i > 25 && i < 40
        ? `shooting-star ${(Math.random() + 2) * 5}s linear ${getRandomInt(
            0,
            10
          )}s 10`
        : '';

    element.append(starDiv);
  }
}
