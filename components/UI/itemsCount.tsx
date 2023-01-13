import React from "react";

const ItemCount: React.FC<{ position: string }> = ({ position }) => {
    return (
        <span className={`absolute  text-xs text-[#e33f3f] ${position}`}>
            10
        </span>
    );
};

export default ItemCount;
