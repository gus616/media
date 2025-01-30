import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

type ExpandablePanelProps = {
  children: React.ReactNode;
  header: React.ReactNode;
}

const ExpandablePanel = ({ children, header }: ExpandablePanelProps) => {

  const [expanded, setExpanded] = useState(false);



  return (
    <div className="mb-2 border rounded flex flex-col "onClick={() => setExpanded(!expanded)}>
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between">
          {header}
        </div>
        <div >
          {expanded ? <GoChevronUp /> : <GoChevronDown />}
        </div>

      
      </div>

      {
          expanded && <div className="p-2 border-t">
            {children}
          </div>
        }


    </div>
  )
}

export default ExpandablePanel