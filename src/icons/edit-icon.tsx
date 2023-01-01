import React from "react";

// TODO Pull the className through as a property, then can set it once for all icons
const EditIcon = () => {
    //@ts-ignore
    return (
        <svg
            id="Layer_1"
            className="h-8 w-8"
            width="24"
            height="24"
            version="1.1"
            viewBox="0 0 50 50"
        >
            <g id="Layer_1_1_">
                <rect height="2" width="22" x="8.793" y="14" />
                <rect height="2" width="22" x="8.793" y="20" />
                <rect height="2" width="17" x="8.793" y="26" />
                <rect height="2" width="12" x="8.793" y="32" />
                <rect height="2" width="12" x="8.793" y="38" />
                <path d="M38.793,18.586v-10L31.207,1H0.793v48h38V31.414L49.207,21l-6.414-6.414L38.793,18.586z M37.793,22.414L41.379,26l-12,12   h-3.586v-3.586L37.793,22.414z M31.793,4.414L35.379,8h-3.586V4.414z M36.793,47h-34V3h27v7h7v10.586l-13,13V40h6.414l6.586-6.586   V47z M42.793,24.586L39.207,21l3.586-3.586L46.379,21L42.793,24.586z" />
            </g>
        </svg>
    );
};

export default EditIcon;
