import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Users } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

describe('StatCard Component — Unit Tests', () => {

    // ─── Basic Rendering ──────────────────────────────────────────────────────
    describe('Basic Rendering', () => {
        test('should render the title', () => {
            render(<StatCard title="Total Students" value={120} icon={Users} color="text-indigo-500" bg="bg-indigo-500/10" />);
            expect(screen.getByText('Total Students')).toBeTruthy();
        });

        test('should render the numeric value', () => {
            render(<StatCard title="Total Students" value={120} icon={Users} color="text-indigo-500" bg="bg-indigo-500/10" />);
            expect(screen.getByText('120')).toBeTruthy();
        });

        test('should render a string value (e.g. formatted revenue)', () => {
            render(<StatCard title="Revenue" value="₹45.3k" icon={Users} color="text-emerald-500" bg="bg-emerald-500/10" />);
            expect(screen.getByText('₹45.3k')).toBeTruthy();
        });

        test('should render zero value', () => {
            render(<StatCard title="Staff" value={0} icon={Users} color="text-sky-500" bg="bg-sky-500/10" />);
            expect(screen.getByText('0')).toBeTruthy();
        });
    });

    // ─── Trend Indicator ─────────────────────────────────────────────────────
    describe('Trend Indicator', () => {
        test('should show positive trend as green with +', () => {
            render(<StatCard title="Students" value={100} icon={Users} color="text-indigo-500" bg="bg-indigo-500/10" trend={12.4} />);
            expect(screen.getByText(/\+12\.4%/)).toBeTruthy();
        });

        test('should show negative trend as red without +', () => {
            render(<StatCard title="Attendance" value="85%" icon={Users} color="text-amber-500" bg="bg-amber-500/10" trend={-1.8} />);
            expect(screen.getByText(/-1\.8%/)).toBeTruthy();
        });

        test('should NOT render trend badge when trend is undefined', () => {
            const { container } = render(
                <StatCard title="Teachers" value={22} icon={Users} color="text-sky-500" bg="bg-sky-500/10" />
            );
            // No trend badge (no % symbol anywhere)
            const trendBadges = container.querySelectorAll('[class*="bg-success"], [class*="bg-danger"]');
            expect(trendBadges.length).toBe(0);
        });
    });

    // ─── Click Handler ────────────────────────────────────────────────────────
    describe('onClick Handler', () => {
        test('should call onClick when card is clicked', () => {
            const onClick = vi.fn();
            const { container } = render(
                <StatCard title="Students" value={100} icon={Users} color="text-indigo-500" bg="bg-indigo-500/10" onClick={onClick} />
            );
            // Click on the card's root div
            fireEvent.click(container.firstChild);
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });
});
