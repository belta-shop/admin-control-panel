/**
 * SimplebarWrapper - A custom scrollbar component that provides a modern, customizable scrolling experience.
 *
 * Features:
 * - Custom scrollbar with smooth animations
 * - Mouse wheel and custom scrollbar support
 * - Disabled on touch devices when imported from ./index.tsx
 * - Fade effects at top and bottom when content is scrollable
 * - Responsive to container size changes
 * - Smooth transitions for scrollbar movement
 * - Support for horizontal, vertical, or both scroll directions
 *
 * @component
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import { Box, Theme, styled, BoxProps } from '@mui/material';

/**
 * Scroll direction options for the SimplebarWrapper
 */
export type ScrollDirection = 'horizontal' | 'vertical' | 'both';

/**
 * Enum for scrollbar element IDs
 */
export enum ScrollbarElement {
  VerticalScrollbar = 'simplebar-vertical-scrollbar',
  HorizontalScrollbar = 'simplebar-horizontal-scrollbar',
  TopFade = 'simplebar-top-fade',
  BottomFade = 'simplebar-bottom-fade',
  LeftFade = 'simplebar-left-fade',
  RightFade = 'simplebar-right-fade',
}

/**
 * Props for the SimplebarWrapper component
 * @interface SimplebarWrapperProps
 * @extends {BoxProps} - Inherits all Material-UI Box component props
 */
export interface SimplebarWrapperProps extends BoxProps {
  /** The content to be rendered inside the scrollable container */
  children: React.ReactNode;
  /** The scroll direction(s) to enable */
  direction?: ScrollDirection;
}

/**
 * A custom scrollbar wrapper component that provides a modern scrolling experience
 * with smooth animations and custom scrollbar styling.
 *
 * @param {SimplebarWrapperProps} props - Component props
 * @returns {JSX.Element} The rendered component
 */
export default function SimplebarWrapper({
  children,
  direction = 'both',
  ...props
}: SimplebarWrapperProps) {
  // Refs for DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // State for scroll position and dimensions
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);

  // Refs for drag handling
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const startScrollTopRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  // Add ref for tracking active scrollbar
  const activeScrollbarRef = useRef<'vertical' | 'horizontal' | null>(null);

  /**
   * Updates the scroll position with bounds checking
   * @param {number} newScrollTop - The new vertical scroll position
   * @param {number} newScrollLeft - The new horizontal scroll position
   */
  const updateScrollPosition = (newScrollTop: number, newScrollLeft: number) => {
    if (direction !== 'horizontal') {
      const boundedScrollTop = Math.max(0, Math.min(newScrollTop, scrollHeight - clientHeight));
      setScrollTop(boundedScrollTop);
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(-${boundedScrollTop}px)`;
      }
    }

    if (direction !== 'vertical') {
      const boundedScrollLeft = Math.max(0, Math.min(newScrollLeft, scrollWidth - clientWidth));
      setScrollLeft(boundedScrollLeft);
      if (contentRef.current) {
        contentRef.current.style.transform = `translate(${-boundedScrollLeft}px, ${
          direction === 'both' ? `-${scrollTop}px` : '0'
        })`;
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    /**
     * Updates scroll information based on content and container dimensions
     */
    const updateScrollInfo = () => {
      const contentHeight = content.scrollHeight;
      const contentWidth = content.scrollWidth;
      const containerHeight = container.clientHeight;
      const containerWidth = container.clientWidth;
      setScrollHeight(contentHeight);
      setScrollWidth(contentWidth);
      setClientHeight(containerHeight);
      setClientWidth(containerWidth);
    };

    /**
     * Handles mouse wheel events for scrolling
     */
    const handleWheel = (e: WheelEvent) => {
      // If shift key is pressed, scroll horizontally if the content is wider than the container
      if (e.shiftKey && direction !== 'vertical' && clientWidth < scrollWidth) {
        e.preventDefault();
        const newScrollLeft = scrollLeft + e.deltaY * 0.5;
        updateScrollPosition(scrollTop, newScrollLeft);
      } else if (direction !== 'horizontal' && clientHeight < scrollHeight) {
        // Otherwise scroll vertically if the content is taller than the container
        e.preventDefault();
        const newScrollTop = scrollTop + e.deltaY * 0.5;
        updateScrollPosition(newScrollTop, scrollLeft);
      }
    };

    /**
     * Handles mouse down events for scrollbar dragging
     */
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isVerticalScrollbar = target.closest(`#${ScrollbarElement.VerticalScrollbar}`);
      const isHorizontalScrollbar = target.closest(`#${ScrollbarElement.HorizontalScrollbar}`);

      if (!isVerticalScrollbar && !isHorizontalScrollbar) return;

      isDraggingRef.current = true;
      startYRef.current = e.clientY;
      startXRef.current = e.clientX;
      startScrollTopRef.current = scrollTop;
      startScrollLeftRef.current = scrollLeft;
      document.body.style.userSelect = 'none';
      if (contentRef.current) contentRef.current.style.transition = 'none';

      // Set active scrollbar
      if (isVerticalScrollbar) {
        activeScrollbarRef.current = 'vertical';
      } else if (isHorizontalScrollbar) {
        activeScrollbarRef.current = 'horizontal';
      }

      if (isVerticalScrollbar || isHorizontalScrollbar) {
        target.style.transition = 'none';
      }
    };

    /**
     * Handles mouse move events during scrollbar dragging
     */
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaY = e.clientY - startYRef.current;
      const deltaX = e.clientX - startXRef.current;

      // Only update the active scrollbar's position
      if (activeScrollbarRef.current === 'vertical') {
        const scrollRatioY = deltaY / clientHeight;
        const newScrollTop = startScrollTopRef.current + scrollRatioY * scrollHeight;
        updateScrollPosition(newScrollTop, scrollLeft);
      } else if (activeScrollbarRef.current === 'horizontal') {
        const scrollRatioX = deltaX / clientWidth;
        const newScrollLeft = startScrollLeftRef.current + scrollRatioX * scrollWidth;
        updateScrollPosition(scrollTop, newScrollLeft);
      }
    };

    /**
     * Handles mouse up events to end scrollbar dragging
     */
    const handleMouseUp = () => {
      if (contentRef.current) contentRef.current.style.transition = '';
      if (!isDraggingRef.current) return;

      const verticalScrollbar = document.querySelector(
        `#${ScrollbarElement.VerticalScrollbar}`
      ) as HTMLElement;
      const horizontalScrollbar = document.querySelector(
        `#${ScrollbarElement.HorizontalScrollbar}`
      ) as HTMLElement;
      if (verticalScrollbar) verticalScrollbar.style.transition = '';
      if (horizontalScrollbar) horizontalScrollbar.style.transition = '';

      isDraggingRef.current = false;
      activeScrollbarRef.current = null;
      document.body.style.userSelect = '';
    };

    // Initial setup
    updateScrollInfo();

    // Setup resize observer
    const resizeObserver = new ResizeObserver(updateScrollInfo);
    resizeObserver.observe(content);

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollHeight, scrollWidth, clientHeight, clientWidth, scrollTop, scrollLeft]);

  // Calculate scrollbar dimensions and visibility
  const verticalScrollbarHeight = clientHeight * (clientHeight / scrollHeight);
  const verticalScrollbarTop = (scrollTop / scrollHeight) * clientHeight;
  const horizontalScrollbarWidth = clientWidth * (clientWidth / scrollWidth);
  const horizontalScrollbarLeft = (scrollLeft / scrollWidth) * clientWidth;

  const showTopFade = direction !== 'horizontal' && scrollTop > 0;
  const showBottomFade = direction !== 'horizontal' && scrollTop < scrollHeight - clientHeight;
  const showLeftFade = direction !== 'vertical' && scrollLeft > 0;
  const showRightFade = direction !== 'vertical' && scrollLeft < scrollWidth - clientWidth;

  const showVerticalScrollbar = direction !== 'horizontal' && scrollHeight > clientHeight;
  const showHorizontalScrollbar = direction !== 'vertical' && scrollWidth > clientWidth;

  return (
    <Box
      ref={containerRef}
      {...props}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        ...props.sx,
        '&:hover': {
          [`& #${ScrollbarElement.VerticalScrollbar}, & #${ScrollbarElement.HorizontalScrollbar}`]:
            {
              opacity: 1,
            },
        },
      }}
    >
      {/* Scrollable content container */}
      <Box
        ref={contentRef}
        sx={{
          position: 'relative',
          width: '100%',
          willChange: 'transform',
          transition: 'transform 0.2s ease-out',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {children}
      </Box>

      <Fade
        id={ScrollbarElement.TopFade}
        to="bottom"
        show={showTopFade ? 'true' : 'false'}
        color={(theme) => theme.palette.background.default}
      />

      <Fade
        id={ScrollbarElement.BottomFade}
        to="top"
        show={showBottomFade ? 'true' : 'false'}
        color={(theme) => theme.palette.background.default}
      />

      <Fade
        id={ScrollbarElement.LeftFade}
        to="right"
        show={showLeftFade ? 'true' : 'false'}
        color={(theme) => theme.palette.background.default}
      />

      <Fade
        id={ScrollbarElement.RightFade}
        to="left"
        show={showRightFade ? 'true' : 'false'}
        color={(theme) => theme.palette.background.default}
      />

      {showVerticalScrollbar && (
        <ScrollBar
          id={ScrollbarElement.VerticalScrollbar}
          direction="vertical"
          sx={{
            top: verticalScrollbarTop,
            height: `${verticalScrollbarHeight}px`,
          }}
        />
      )}

      {showHorizontalScrollbar && (
        <ScrollBar
          id={ScrollbarElement.HorizontalScrollbar}
          direction="horizontal"
          sx={{
            left: horizontalScrollbarLeft,
            width: `${horizontalScrollbarWidth}px`,
          }}
        />
      )}
    </Box>
  );
}

const ScrollBar = styled(Box)<BoxProps & { direction: 'horizontal' | 'vertical' }>(
  ({ direction }) => ({
    position: 'absolute',
    [direction === 'vertical' ? 'width' : 'height']: '4px',
    [direction === 'vertical' ? 'right' : 'bottom']: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '2px',
    transition:
      'width 0.2s ease-out, background-color 0.2s ease-out, right 0.2s ease-out, top 0.2s ease-out, opacity 0.2s ease-out',
    '&:hover': {
      [direction === 'vertical' ? 'width' : 'height']: '6px',
      [direction === 'vertical' ? 'right' : 'bottom']: -1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    '&:active': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      transition: 'none',
    },
    zIndex: 3000,
  })
);

const Fade = styled(Box)<
  BoxProps & {
    to: 'top' | 'bottom' | 'left' | 'right';
    show: 'true' | 'false';
    color: string | ((theme: Theme) => string);
  }
>(({ theme, to, show, color }) => {
  const isVertical = to === 'top' || to === 'bottom';
  const isHorizontal = to === 'left' || to === 'right';

  const currentColor = typeof color === 'function' ? color(theme) : color;

  const position = {
    bottom: to === 'bottom' ? undefined : 0,
    left: to === 'left' ? undefined : 0,
    right: to === 'right' ? undefined : 0,
    top: to === 'top' ? undefined : 0,
  };

  const fadeStyle = {
    position: 'absolute',
    ...position,
    height: isVertical ? (show === 'true' ? '100px' : '0px') : undefined,
    width: isHorizontal ? (show === 'true' ? '100px' : '0px') : undefined,
    background: `linear-gradient(to ${to}, ${currentColor}, rgba(255, 255, 255, 0))`,
    pointerEvents: 'none',
    transition: 'height 0.2s ease-out',
    overflow: 'hidden',
    zIndex: 2500,
  };

  return {
    position: 'absolute',
    ...position,
    height: isVertical ? (show ? '15px' : '0px') : undefined,
    width: isHorizontal ? (show ? '15px' : '0px') : undefined,

    '::before': {
      content: '""',
      ...fadeStyle,
    },
  };
});
