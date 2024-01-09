import React from "react";

function PreloaderSpin() {
    return (
        <div id="preloader">
            <div className="wrapper">
                <svg>
                    <text x="50%" y="50%" dy=".35em" textAnchor="middle" fontSize="16">
                        Clip it
                    </text>
                </svg>
            </div>
        </div>
    );
}

export default PreloaderSpin;
