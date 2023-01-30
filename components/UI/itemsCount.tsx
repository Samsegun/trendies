import React from "react";

const ItemCount: React.FC<{ position: string; qty: number }> = ({
    position,
    qty,
}) => {
    return (
        <span className={`absolute  text-xs text-[#e33f3f] ${position}`}>
            {qty}
        </span>
    );
};

export default ItemCount;
