import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from '@/components/DataTable';

// Columns definition for tests
const columns = [
    { key: 'name',   label: 'Name' },
    { key: 'email',  label: 'Email' },
    { key: 'status', label: 'Status' },
];

const mockData = [
    { _id: 'r1', name: 'Alice Johnson', email: 'alice@lnmi.in',   status: 'active' },
    { _id: 'r2', name: 'Bob Smith',     email: 'bob@lnmi.in',     status: 'active' },
    { _id: 'r3', name: 'Carol White',   email: 'carol@lnmi.in',   status: 'inactive' },
];

describe('DataTable Component — Unit Tests', () => {

    // ─── Loading State ────────────────────────────────────────────────────────
    describe('Loading State', () => {
        test('should show loading spinner when loading=true', () => {
            render(<DataTable columns={columns} data={[]} loading={true} />);
            // The loading state renders "Synchronizing" text
            expect(screen.getByText(/synchronizing/i)).toBeTruthy();
        });

        test('should NOT show table when loading=true', () => {
            render(<DataTable columns={columns} data={mockData} loading={true} />);
            expect(screen.queryByRole('table')).toBeNull();
        });
    });

    // ─── Empty State ──────────────────────────────────────────────────────────
    describe('Empty State', () => {
        test('should show emptyTitle when data is empty array', () => {
            render(
                <DataTable
                    columns={columns}
                    data={[]}
                    loading={false}
                    emptyTitle="No records found"
                />
            );
            expect(screen.getByText('No records found')).toBeTruthy();
        });

        test('should show emptyDescription when data is empty', () => {
            render(
                <DataTable
                    columns={columns}
                    data={[]}
                    loading={false}
                    emptyDescription="Try adjusting your filters."
                />
            );
            expect(screen.getByText(/try adjusting your filters/i)).toBeTruthy();
        });

        test('should show default emptyTitle when not provided and data is empty', () => {
            render(<DataTable columns={columns} data={[]} loading={false} />);
            expect(screen.getByText('No data found')).toBeTruthy();
        });
    });

    // ─── Data Rendering ───────────────────────────────────────────────────────
    describe('Data Rendering', () => {
        test('should render a table when data is provided', () => {
            render(<DataTable columns={columns} data={mockData} loading={false} />);
            expect(screen.getByRole('table')).toBeTruthy();
        });

        test('should render column headers', () => {
            render(<DataTable columns={columns} data={mockData} loading={false} />);
            expect(screen.getByText('Name')).toBeTruthy();
            expect(screen.getByText('Email')).toBeTruthy();
            expect(screen.getByText('Status')).toBeTruthy();
        });

        test('should render all rows from data', () => {
            render(<DataTable columns={columns} data={mockData} loading={false} />);
            expect(screen.getByText('Alice Johnson')).toBeTruthy();
            expect(screen.getByText('Bob Smith')).toBeTruthy();
            expect(screen.getByText('Carol White')).toBeTruthy();
        });

        test('should render row with custom render function', () => {
            const customColumns = [
                {
                    key: 'status',
                    label: 'Status',
                    render: (v) => <span data-testid="status-badge">{v?.toUpperCase()}</span>,
                },
            ];
            render(<DataTable columns={customColumns} data={[mockData[0]]} loading={false} />);
            expect(screen.getByTestId('status-badge').textContent).toBe('ACTIVE');
        });
    });

    // ─── Row Click ────────────────────────────────────────────────────────────
    describe('Row Click Handler', () => {
        test('should call onRowClick with the row data when a row is clicked', () => {
            const onRowClick = vi.fn();
            render(<DataTable columns={columns} data={mockData} loading={false} onRowClick={onRowClick} />);

            const rows = screen.getAllByRole('row');
            // rows[0] is the header, rows[1] is first data row
            fireEvent.click(rows[1]);
            expect(onRowClick).toHaveBeenCalledTimes(1);
            expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
        });

        test('should NOT call onRowClick when no handler provided (no error)', () => {
            render(<DataTable columns={columns} data={mockData} loading={false} />);
            const rows = screen.getAllByRole('row');
            expect(() => fireEvent.click(rows[1])).not.toThrow();
        });
    });
});
