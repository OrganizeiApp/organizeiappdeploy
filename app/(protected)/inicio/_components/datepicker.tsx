import { useState } from "react";

export function Calendar() {
    const [ start, setStart ] = useState(new Date());
    const [ end, setEnd ] = useState(new Date());

    console.log(start);

    return(
        <div>

        </div>
    )
}