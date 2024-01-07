import { ResponsiveHoneycomb, Hexagon } from "react-honeycomb";

import range from "lodash/range";
const items = range(88);
const sideLength = 88;


function LatestUsersList() {
    return (
        <div id="LatestUsersList">
            <div className="wrapper fl_col gp50">
                <p class="p60 txt_white w-700">Latest <span class="txt_primary">Registred </span>Users</p>
                <ResponsiveHoneycomb
                    defaultWidth={1024}
                    size={sideLength}
                    items={items}
                    renderItem={(item) => (
                        <Hexagon>
                            <img
                                src={`https://i.pravatar.cc/${sideLength * 2}?random=${item}`}
                                alt={`Random #${item}`}
                            />
                        </Hexagon>
                    )}
                />
            </div>
        </div>
    );
}

export default LatestUsersList;
