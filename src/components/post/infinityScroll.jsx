import React, { useEffect, useCallback } from "react";

import _ from "lodash";
import Spinner from "../../elements/spinner";

const InfinityScroll = (props) => {
  const { children, callNext, hasNext, loading, isIdolFilter } = props;

  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      if (loading) {
        return;
      }

      if (isIdolFilter) {
        callNext("idol");
      } else {
        callNext("home");
      }
    }
  }, 300);
  const handleScroll = useCallback(_handleScroll, [loading]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (hasNext) {
      window.addEventListener("scroll", handleScroll, true);
    } else {
      window.removeEventListener("scroll", handleScroll, true);
    }

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [hasNext, loading]);

  return (
    <>
      {children}
      {hasNext && <Spinner />}
    </>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  hasNext: false,
  loading: false,
};

export default InfinityScroll;
