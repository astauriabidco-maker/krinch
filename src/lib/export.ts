export function downloadAsCSV(data: any[], filename: string) {
    if (!data || !data.length) {
        console.warn("No data to export");
        return;
    }

    const separator = ',';
    const keys = Object.keys(data[0]);

    // Header Row
    const csvContent = [
        keys.join(separator),
        ...data.map(row =>
            keys.map(key => {
                let val = row[key];
                // Escape quotes
                if (typeof val === 'string') {
                    val = `"${val.replace(/"/g, '""')}"`;
                }
                // Handle dates/objects
                if (val instanceof Date) val = val.toISOString();
                if (typeof val === 'object' && val !== null) val = JSON.stringify(val).replace(/"/g, '""');
                return val ?? '';
            }).join(separator)
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
