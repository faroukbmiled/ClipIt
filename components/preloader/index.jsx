import React, { useState, useEffect } from "react";

function preloaderSpin() {
    return (
        <div id="preloader">
            <div class="wrapper">
                <svg>
                    <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                        Clip it
                    </text>
                </svg>
            </div>
        </div>
    );
}

export default preloaderSpin;
