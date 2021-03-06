import React, { useState, useMemo } from 'react'
import moment from 'moment';
import { jsx, css } from '@emotion/core';
moment.locale('pl');

const Main = ({ dataProps }) => {
    const [data, setData] = useState(dataProps);
    const [field, setField] = useState(null);
    const [direction, setDirection] = useState(null);

    const sortedAsc = useMemo(() => {
        if (!field) return data;
        if (field === 'id' || field === 'note') {
            return data.slice().sort((a, b) => a[field] - b[field]);
        } else if (field === 'dateOfBirth') {
            return data.slice().sort((a, b) => {
                if (moment(a[field], 'DD.MM.YYYY HH:mm').format() < moment(b[field], 'DD.MM.YYYY HH:mm').format()) {
                    return -1;
                }
                if (moment(a[field], 'DD.MM.YYYY HH:mm').format() > moment(b[field], 'DD.MM.YYYY HH:mm').format()) {
                    return 1;
                }
                return 0;
            })
        } else {
            return data.slice().sort((a, b) => a[field].localeCompare(b[field]));
        }
    }, [data, field]);

    const sortedDesc = useMemo(() => {
        if (!field) return data;
        if (field === 'id' || field === 'note') {
            return data.slice().sort((a, b) => b[field] - a[field]);
        } else if (field === 'dateOfBirth') {
            return data.slice().sort((a, b) => {
                if (moment(b[field], 'DD.MM.YYYY HH:mm').format() < moment(a[field], 'DD.MM.YYYY HH:mm').format()) {
                    return -1;
                }
                if (moment(b[field], 'DD.MM.YYYY HH:mm').format() > moment(a[field], 'DD.MM.YYYY HH:mm').format()) {
                    return 1;
                }
                return 0;
            })
        } else {
            return data.slice().sort((a, b) => b[field].localeCompare(a[field]));
        }
    }, [data, field]);

    const sortedData = useMemo(() => {
        if (direction) {
            return sortedAsc
        } else {
            return sortedDesc
        }
    }, [data, field, direction]);

    const mainTableBackgroundColor = `#E5EEFB`;
    const additionalTableBackgroundColor = `#DAE0E9`;
    const textColor = `#3A5071`;
    const additionalTextColor = `#577198`;
    const arrowSize = `10 px solid`;

    return (
        <main
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            `}
        >
            <table
                css={css`
                width: 800px;
                height: 100%;
                tr {
                    width: 100%;
                    display: flex;
                    &:last-of-type {
                        box-shadow: 0 33px 48px -18px rgba(0,0,0,0.3);
                    }
                    &:last-child td.number {
                        border-bottom-left-radius: 5px;
                    }
                    &:last-child td.note {
                        border-bottom-right-radius: 5px;
                    }
                }
                th {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 56px;
                    width: 100%;
                    background: ${mainTableBackgroundColor};
                    border: 1px solid ${additionalTableBackgroundColor};
                    font-weight: bold;
                    font-size: 14px;
                    letter-spacing: 0.66px;
                    text-align: center;
                    &:first-child {
                        border-top-left-radius: 5px;
                    }
                    &:last-child {
                        border-top-right-radius: 5px;
                    }
                    .arrows {
                        padding-left: 10px;
                        .arrow-up {
                            width: 0;
                            height: 0;
                            border-left: ${arrowSize} transparent;
                            border-right: ${arrowSize} transparent;
                            border-bottom: ${arrowSize} ${textColor};
                            margin-bottom: 5px;
                            cursor: pointer;
                        }
                        .arrow-down {
                            width: 0;
                            height: 0;
                            border-left: ${arrowSize} transparent;
                            border-right: ${arrowSize} transparent;
                            border-top: ${arrowSize} ${textColor};
                            cursor: pointer;
                        }
                    }
                }
            `}
            >
                <thead>
                <tr>
                    <th className="number">iD
                        <div className="arrows">
                            <div onClick={() => {
                                setField('id');
                                setDirection(true)
                            }} className="arrow-up"/>
                            <div onClick={() => {
                                setField('id');
                                setDirection(false)
                            }} className="arrow-down"/>
                        </div>
                    </th>
                    <th className="firstname">First name
                        <div className="arrows">
                            <div onClick={() => {
                                setField('firstName');
                                setDirection(true)
                            }} className="arrow-up"/>
                            <div onClick={() => {
                                setField('firstName');
                                setDirection(false)
                            }} className="arrow-down"/>
                        </div>
                    </th>
                    <th className="lastname">Last name
                        <div className="arrows">
                            <div onClick={() => {
                                setField('lastName');
                                setDirection(true)
                            }} className="arrow-up"/>
                            <div onClick={() => {
                                setField('lastName');
                                setDirection(false)
                            }} className="arrow-down"/>
                        </div>
                    </th>
                    <th className="date">Birth date
                        <div className="arrows">
                            <div onClick={() => {
                                setField('dateOfBirth');
                                setDirection(true)
                            }} className="arrow-up"/>
                            <div onClick={() => {
                                setField('dateOfBirth');
                                setDirection(false)
                            }} className="arrow-down"/>
                        </div>
                    </th>
                    <th className="company">Company
                        <div className="arrows">
                            <div onClick={() => {
                                setField('company');
                                setDirection(true)
                            }} className="arrow-up"/>
                            <div onClick={() => {
                                setField('company');
                                setDirection(false)
                            }} className="arrow-down"/>
                        </div>
                    </th>
                    <th className="note">Note
                        <div className="arrows">
                            <div onClick={() => {
                                setField('note');
                                setDirection(true)
                            }} className="arrow-up"/>
                            <div onClick={() => {
                                setField('note');
                                setDirection(false)
                            }} className="arrow-down"/>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody
                    css={css`
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        tr {
                         &:nth-of-type(even) {
                            td {
                                background: #F1F6FC;
                            }
                         }
                        }
                    `}
                >
                {sortedData.map((user) => {
                    return (
                        <tr key={user.id}
                            css={css`
                                td {
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    height: 56px;
                                    width: 100%;
                                    background: #FFFFFF;
                                    border: 1px solid ${additionalTableBackgroundColor};
                                    font-size: 16px;
                                    color: ${additionalTextColor};
                                    letter-spacing: 0.75px;
                                    text-align: center;
                                    &:nth-of-type(odd) {
                                        font-weight: bold;
                                    }
                                }
            `}
                        >
                            <td className="number">{user.id}</td>
                            <td className="firstname">{user.firstName}</td>
                            <td className="lastname">{user.lastName}</td>
                            <td className="date">{moment(user.dateOfBirth, 'DD.MM.YYYY HH:mm').format('LL')}</td>
                            <td className="company">{user.company}</td>
                            <td className="note">{user.note}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </main>
    );
};

export default Main


