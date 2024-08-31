
export default function burgerToggle() {
  let isExpanded = false;
  const divBurger = document.querySelector('.burger');
  const rootElement = document.querySelector('body');
  const bgElement = document.querySelector('.burger-bg');

  const isBgElementExpanded = bgElement?.classList.contains('burger--expanded');
  const isDivBurgerExpanded = divBurger?.classList.contains('burger--expanded');
  const isRootElementExpanded =
    rootElement?.classList.contains('burger--expanded');

  if (isDivBurgerExpanded || isRootElementExpanded || isBgElementExpanded)
    isExpanded = true;

  if (isExpanded) {
    isDivBurgerExpanded && divBurger?.classList.remove('burger--expanded');
    isBgElementExpanded && bgElement?.classList.remove('burger--expanded');
    setTimeout(
      () =>
        isRootElementExpanded && rootElement?.classList.remove('burger--expanded'),
      200
    );
  } else {
    !isDivBurgerExpanded && divBurger?.classList.add('burger--expanded');
    !isRootElementExpanded && rootElement?.classList.add('burger--expanded');
    !isBgElementExpanded && bgElement?.classList.add('burger--expanded');
  }
}