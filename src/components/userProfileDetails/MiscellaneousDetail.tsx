import {type ReactNode, useEffect, useRef, useState } from "react";
import '../../index.css';
export type Props = {
    theme?: {
        primaryColor?: string;
        secondaryColor?: string;
    }
    icon: JSX.Element;
    title: ReactNode;
    id: string;
    link?: string;
}

/**
 * Component for displaying miscellaneous details with an icon and optional tooltip.
 * @param {object} props - The props object.
 * @param {JSX.Element} props.icon - The icon element to display.
 * @param {ReactNode} props.title - The title or content to display.
 * @param {string} props.id - The unique identifier for the component.
 * @param {string} [props.link] - The optional link URL.
 * @returns The JSX element representing the miscellaneous detail.
 */
function MiscellaneousDetail({
    icon,
    title,
    id,
    link,
    theme = {
        primaryColor: "rgba(34,211,238,1)",
        secondaryColor: "rgba(209,213,219,1)"
    }
}: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const width = ref.current?.offsetWidth;
    const parentWidth = ref.current?.parentElement?.scrollWidth;

    if(width && parentWidth && parentWidth <= width) {
      setShowTooltip(true);
    }

  }, [title])

  const content = (
    <>
      <div id={id+"icon"} className="misc_content_icon w-5 h-5 flex items-end justify-center">
            {icon}
        </div>

        {
          showTooltip && (
            <span className='misc_content_title_container group w-full overflow-hidden text-start text-nowrap text-ellipsis'>
              <span className='invisible absolute group-hover:visible group-hover:z-50 rounded text-sm shadow-lg p-2 -ml-[0%] bg-black text-white mt-7'>{title}</span>
              <span className='misc_content_title text-base text-start'>{title}</span>
            </span>
          )
        }

        {
          !showTooltip && (
            <span className="misc_content_title_container overflow-hidden text-start text-nowrap text-ellipsis w-full">
              <span ref={ref} className='misc_content_title text-base text-start'>{title}</span>
            </span>
          )
        }
    </>
  )

  if(link) {
    return (
      <a 
        style={{
          color: hover ? theme.primaryColor : theme.secondaryColor,
        }} 
        onMouseOver={()=> setHover(true)} 
        onMouseOut={()=> setHover(false)}
        id={id} 
        className={`misc_content_container flex items-start gap-2 mb-2 hover:text-[${theme.primaryColor}]`} 
        target="_blank" href={link}
      >
        {content}
      </a>
    )
  }
  

  return (
    <div 
      id={id} 
      className="misc_content_container flex items-start gap-2 mb-2"
      style={{
        color: hover ? theme.primaryColor : theme.secondaryColor,
      }} 
      onMouseOver={()=> setHover(true)} 
      onMouseOut={()=> setHover(false)}
    >
        {content}
    </div>
  )
}
export default MiscellaneousDetail;