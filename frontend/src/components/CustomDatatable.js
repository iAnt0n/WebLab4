import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import React from "react";

export function CustomDatatable(props) {
    const adjustedHistory = props.pointHistory
        .map(point => ({ ...point, result: point.result ? 'Hit' : 'Miss' }))
        .reverse();

    return (
        <DataTable value={adjustedHistory}>
            <Column field="x" header="X" bodyStyle={{ wordBreak: 'break-all' }}/>
            <Column field="y" header="Y" bodyStyle={{ wordBreak: 'break-all' }}/>
            <Column field="r" header="R" bodyStyle={{ wordBreak: 'break-all' }}/>
            <Column field="result" header="Result"/>
        </DataTable>
    );
}