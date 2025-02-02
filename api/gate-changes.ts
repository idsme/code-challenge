import {ArrivalFlight} from './arrivals';
import {DepartureFlight} from './departures';

export interface GateChange {
    previousGate: string;
    currentGate: string;
    flightNumber: string;
    direction: 'Arrival' | 'Departure';
}

export interface SearchResult extends GateChange, ArrivalFlight, DepartureFlight {}

export const gateChanges: GateChange[] = [
    {
        currentGate: 'B3',
        previousGate: 'H11',
        flightNumber: 'OR1621',
        direction: 'Departure',
    },
    {
        currentGate: 'H6',
        previousGate: 'H10',
        flightNumber: 'EZY907',
        direction: 'Departure',
    },
    {
        currentGate: 'E21',
        previousGate: 'H22',
        flightNumber: 'TY785',
        direction: 'Departure',
    },
    {
        currentGate: 'G3',
        previousGate: 'H20',
        flightNumber: 'GB706',
        direction: 'Departure',
    },
    {
        currentGate: 'G15',
        previousGate: 'B12',
        flightNumber: 'TY1451',
        direction: 'Departure',
    },
    {
        currentGate: 'H26',
        previousGate: 'A20',
        flightNumber: 'KL1915',
        direction: 'Departure',
    },
    {
        currentGate: 'F2',
        previousGate: 'H12',
        flightNumber: 'PC1428',
        direction: 'Departure',
    },
    {
        currentGate: 'D24',
        previousGate: 'H14',
        flightNumber: 'GB1136',
        direction: 'Departure',
    },
    {
        currentGate: 'E1',
        previousGate: 'D7',
        flightNumber: 'BA1191',
        direction: 'Departure',
    },
    {
        currentGate: 'D21',
        previousGate: 'E20',
        flightNumber: 'AY1377',
        direction: 'Departure',
    },
    {
        currentGate: 'G19',
        previousGate: 'C6',
        flightNumber: 'RY614',
        direction: 'Departure',
    },
    {
        currentGate: 'E10',
        previousGate: 'A2',
        flightNumber: 'SK1731',
        direction: 'Departure',
    },
    {
        currentGate: 'H10',
        previousGate: 'A21',
        flightNumber: 'GB1504',
        direction: 'Departure',
    },
    {
        currentGate: 'E0',
        previousGate: 'B26',
        flightNumber: 'TY1975',
        direction: 'Departure',
    },
    {
        currentGate: 'E20',
        previousGate: 'B5',
        flightNumber: 'CND1623',
        direction: 'Departure',
    },
    {
        currentGate: 'E15',
        previousGate: 'H17',
        flightNumber: 'BA548',
        direction: 'Departure',
    },
    {
        currentGate: 'F0',
        previousGate: 'D4',
        flightNumber: 'OR1402',
        direction: 'Departure',
    },
    {
        currentGate: 'C6',
        previousGate: 'D24',
        flightNumber: 'EZY1457',
        direction: 'Departure',
    },
    {
        currentGate: 'F23',
        previousGate: 'G22',
        flightNumber: 'PC1026',
        direction: 'Departure',
    },
    {
        currentGate: 'D18',
        previousGate: 'D1',
        flightNumber: 'SU794',
        direction: 'Departure',
    },
    {
        currentGate: 'D20',
        previousGate: 'H6',
        flightNumber: 'AT1384',
        direction: 'Departure',
    },
    {
        currentGate: 'A24',
        previousGate: 'D12',
        flightNumber: 'BA517',
        direction: 'Departure',
    },
    {
        currentGate: 'H15',
        previousGate: 'D21',
        flightNumber: 'AT1368',
        direction: 'Departure',
    },
    {
        currentGate: 'F17',
        previousGate: 'B11',
        flightNumber: 'AY1949',
        direction: 'Departure',
    },
    {
        currentGate: 'E7',
        previousGate: 'D20',
        flightNumber: 'SU1252',
        direction: 'Departure',
    },
    {
        currentGate: 'C21',
        previousGate: 'F17',
        flightNumber: 'AY730',
        direction: 'Departure',
    },
    {
        currentGate: 'F16',
        previousGate: 'F14',
        flightNumber: 'AT1716',
        direction: 'Departure',
    },
    {
        currentGate: 'D3',
        previousGate: 'G22',
        flightNumber: 'SU1069',
        direction: 'Departure',
    },
    {
        currentGate: 'C23',
        previousGate: 'G25',
        flightNumber: 'PC644',
        direction: 'Departure',
    },
    {
        currentGate: 'B15',
        previousGate: 'A22',
        flightNumber: 'SU1194',
        direction: 'Departure',
    },
    {
        currentGate: 'D27',
        previousGate: 'D23',
        flightNumber: 'BA1583',
        direction: 'Departure',
    },
    {
        currentGate: 'F17',
        previousGate: 'B11',
        flightNumber: 'BA565',
        direction: 'Departure',
    },
    {
        currentGate: 'F13',
        previousGate: 'H4',
        flightNumber: 'CND1636',
        direction: 'Arrival',
    },
    {
        currentGate: 'G5',
        previousGate: 'C9',
        flightNumber: 'GB1363',
        direction: 'Arrival',
    },
    {
        currentGate: 'F6',
        previousGate: 'E15',
        flightNumber: 'BA1579',
        direction: 'Arrival',
    },
    {
        currentGate: 'D17',
        previousGate: 'G6',
        flightNumber: 'GB1210',
        direction: 'Arrival',
    },
    {
        currentGate: 'H8',
        previousGate: 'E14',
        flightNumber: 'RY1223',
        direction: 'Arrival',
    },
    {
        currentGate: 'B10',
        previousGate: 'H17',
        flightNumber: 'TY1601',
        direction: 'Arrival',
    },
    {
        currentGate: 'H0',
        previousGate: 'B27',
        flightNumber: 'EZY1108',
        direction: 'Arrival',
    },
    {
        currentGate: 'A14',
        previousGate: 'B6',
        flightNumber: 'TY1628',
        direction: 'Arrival',
    },
    {
        currentGate: 'G8',
        previousGate: 'D4',
        flightNumber: 'SU1054',
        direction: 'Arrival',
    },
    {
        currentGate: 'E2',
        previousGate: 'A4',
        flightNumber: 'OR629',
        direction: 'Arrival',
    },
    {
        currentGate: 'C11',
        previousGate: 'F0',
        flightNumber: 'RY1274',
        direction: 'Arrival',
    },
    {
        currentGate: 'G23',
        previousGate: 'H1',
        flightNumber: 'AY1407',
        direction: 'Arrival',
    },
    {
        currentGate: 'A7',
        previousGate: 'H12',
        flightNumber: 'EZY1488',
        direction: 'Arrival',
    },
    {
        currentGate: 'F6',
        previousGate: 'A17',
        flightNumber: 'GB1667',
        direction: 'Arrival',
    },
    {
        currentGate: 'E25',
        previousGate: 'H1',
        flightNumber: 'LH1103',
        direction: 'Arrival',
    },
    {
        currentGate: 'A4',
        previousGate: 'E19',
        flightNumber: 'OR1941',
        direction: 'Arrival',
    },
    {
        currentGate: 'C27',
        previousGate: 'G1',
        flightNumber: 'OR1566',
        direction: 'Arrival',
    },
    {
        currentGate: 'D8',
        previousGate: 'H21',
        flightNumber: 'SK832',
        direction: 'Arrival',
    },
    {
        currentGate: 'A16',
        previousGate: 'G24',
        flightNumber: 'EZY1420',
        direction: 'Arrival',
    },
    {
        currentGate: 'A18',
        previousGate: 'H0',
        flightNumber: 'CND1844',
        direction: 'Arrival',
    },
    {
        currentGate: 'G24',
        previousGate: 'D5',
        flightNumber: 'SU503',
        direction: 'Arrival',
    },
    {
        currentGate: 'H8',
        previousGate: 'A5',
        flightNumber: 'GB591',
        direction: 'Arrival',
    },
    {
        currentGate: 'A2',
        previousGate: 'A4',
        flightNumber: 'BA1261',
        direction: 'Arrival',
    },
    {
        currentGate: 'G1',
        previousGate: 'B13',
        flightNumber: 'RY1378',
        direction: 'Arrival',
    },
    {
        currentGate: 'E12',
        previousGate: 'F22',
        flightNumber: 'EZY1358',
        direction: 'Arrival',
    },
    {
        currentGate: 'C22',
        previousGate: 'F12',
        flightNumber: 'SK871',
        direction: 'Arrival',
    },
    {
        currentGate: 'H22',
        previousGate: 'B8',
        flightNumber: 'SU799',
        direction: 'Arrival',
    },
    {
        currentGate: 'A26',
        previousGate: 'H16',
        flightNumber: 'AT1110',
        direction: 'Arrival',
    },
    {
        currentGate: 'A16',
        previousGate: 'E18',
        flightNumber: 'KL827',
        direction: 'Arrival',
    },
    {
        currentGate: 'C10',
        previousGate: 'B22',
        flightNumber: 'SU1895',
        direction: 'Arrival',
    },
    {
        currentGate: 'F26',
        previousGate: 'G27',
        flightNumber: 'EZY1393',
        direction: 'Arrival',
    },
    {
        currentGate: 'E5',
        previousGate: 'D20',
        flightNumber: 'AT1225',
        direction: 'Arrival',
    },
];
