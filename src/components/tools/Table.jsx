const Table = ({items, onClickItems}) => {
    return (
        <table>
            <tbody>
                { 
                    items.map(({ item, id }) => (
                        <tr key={id}>
                            <td onClick={() => onClickItems(id)}>{item}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table;