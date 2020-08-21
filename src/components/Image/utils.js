import noop from 'no-op';

export function intersectionObserver(el, config = {}) {
  const options = {
    threshold: 0,
    triggerOnce: true,
    viewportTriggerPercentageTop: 0,
    viewportTriggerPercentageBottom: 0,
    viewportTriggerPercentageLeft: 0,
    viewportTriggerPercentageRight: 0,
    onIntersectionIn: noop,
    onIntersectionOut: noop,
    ...config
  };

  if (!el) {
    return;
  }

  const observer = new IntersectionObserver(
    function(entries) {
      if (entries[0].isIntersecting) {
        options.onIntersectionIn(entries[0]);

        if (options.triggerOnce) {
          observer.unobserve(el);
          observer.disconnect();
        }
      } else {
        options.onIntersectionOut(entries[0]);
      }
    },
    {
      threshold: options.threshold,
      rootMargin: `${options.viewportTriggerPercentageTop * -1}% ${options.viewportTriggerPercentageRight *
        -1}% ${options.viewportTriggerPercentageBottom * -1}% ${options.viewportTriggerPercentageLeft * -1}%`
    }
  );

  observer.observe(el);

  return {
    destroy: () => {
      observer.unobserve(el);
      observer.disconnect();
    }
  };
}
