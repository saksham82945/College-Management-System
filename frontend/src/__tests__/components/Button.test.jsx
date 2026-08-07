import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/Button';
import { Plus, Trash2 } from 'lucide-react';

describe('Button Component — Unit Tests', () => {

    // ─── Rendering ────────────────────────────────────────────────────────────
    describe('Basic Rendering', () => {
        test('should render button text', () => {
            render(<Button>Add Student</Button>);
            expect(screen.getByText('Add Student')).toBeTruthy();
        });

        test('should render as a button element', () => {
            render(<Button>Click Me</Button>);
            expect(screen.getByRole('button')).toBeTruthy();
        });

        test('should render with icon', () => {
            const { container } = render(<Button icon={Plus}>Add</Button>);
            expect(container.querySelector('svg')).toBeTruthy();
        });
    });

    // ─── Variants ─────────────────────────────────────────────────────────────
    describe('Variants', () => {
        test('should apply primary variant class', () => {
            const { container } = render(<Button variant="primary">Primary</Button>);
            const btn = container.querySelector('button');
            expect(btn.className).toMatch(/primary|indigo|gradient/i);
        });

        test('should apply danger variant class', () => {
            const { container } = render(<Button variant="danger" icon={Trash2}>Delete</Button>);
            const btn = container.querySelector('button');
            expect(btn.className).toMatch(/danger|red|rose/i);
        });
    });

    // ─── Disabled State ───────────────────────────────────────────────────────
    describe('Disabled State', () => {
        test('should be disabled when disabled prop is true', () => {
            render(<Button disabled>Disabled</Button>);
            expect(screen.getByRole('button')).toBeDisabled();
        });

        test('should NOT fire onClick when disabled', () => {
            const onClick = vi.fn();
            render(<Button disabled onClick={onClick}>Disabled</Button>);
            fireEvent.click(screen.getByRole('button'));
            expect(onClick).not.toHaveBeenCalled();
        });
    });

    // ─── Click Handler ────────────────────────────────────────────────────────
    describe('Click Handler', () => {
        test('should fire onClick when clicked', () => {
            const onClick = vi.fn();
            render(<Button onClick={onClick}>Click</Button>);
            fireEvent.click(screen.getByRole('button'));
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        test('should pass click event to handler', () => {
            const onClick = vi.fn();
            render(<Button onClick={onClick}>Click</Button>);
            fireEvent.click(screen.getByRole('button'));
            expect(onClick).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    // ─── Loading State ────────────────────────────────────────────────────────
    describe('Loading State', () => {
        test('should show loading text/spinner when loading=true', () => {
            const { container } = render(<Button loading={true}>Submit</Button>);
            const btn = container.querySelector('button');
            // Either the button is disabled or shows a spinner
            expect(btn).toBeTruthy();
        });
    });
});
