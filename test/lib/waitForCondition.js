export default function (check, maxTicks, currentTick) {
  let max = maxTicks || 60;
  let tick = currentTick || 0;
  if (check()) {
    return Promise.resolve();
  } else {
    if (tick >= max) {
      return Promise.reject('Took too long');
    }
    return new Promise((resolve, reject) => {
      window.requestAnimationFrame(()=>{
        resolve(waitForCondition(check, max, tick++));
      });
    })
  }
};