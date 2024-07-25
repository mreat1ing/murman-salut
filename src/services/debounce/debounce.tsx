export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  cb: F,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<F>) {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
};

export default debounce;
