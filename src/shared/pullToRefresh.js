/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */
export const pullToRefresh = (onRefresh) => {
  const pStart = { x: 0, y: 0 };
  const pStop = { x: 0, y: 0 };

  const isPullDown = (dY, dX) => {
    return (
      dY < 0 &&
      ((Math.abs(dX) <= 100 && Math.abs(dY) >= 300) ||
        (Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60))
    );
  };

  const swipeCheck = () => {
    const changeY = pStart.y - pStop.y;
    const changeX = pStart.x - pStop.x;
    if (isPullDown(changeY, changeX)) {
      // onRefresh();
      window.location.reload();
    }
  };

  const swipeStart = (e) => {
    if (typeof e["targetTouches"] !== "undefined") {
      const touch = e.targetTouches[0];
      pStart.x = touch.screenX;
      pStart.y = touch.screenY;
    } else {
      pStart.x = e.screenX;
      pStart.y = e.screenY;
    }
  };

  const swipeEnd = (e) => {
    if (typeof e["changedTouches"] !== "undefined") {
      const touch = e.changedTouches[0];
      pStop.x = touch.screenX;
      pStop.y = touch.screenY;
    } else {
      pStop.x = e.screenX;
      pStop.y = e.screenY;
    }

    swipeCheck();
  };

  document.addEventListener(
    "touchstart",
    function (e) {
      swipeStart(e);
    },
    false,
  );
  document.addEventListener(
    "touchend",
    function (e) {
      swipeEnd(e);
    },
    false,
  );

  return () => {
    window.removeEventListener("touchstart", swipeStart, true);
    window.removeEventListener("touchend", swipeEnd, true);
  };
};
