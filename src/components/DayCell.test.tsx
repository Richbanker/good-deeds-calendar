import { render, screen, fireEvent } from '@testing-library/react';
import DayCell from './DayCell';

describe('DayCell', () => {
  it('renders day number', () => {
    render(<DayCell day={5} isToday={false} onClick={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders deed icon if provided', () => {
    render(<DayCell day={10} isToday={false} deedIcon="😊" onClick={() => {}} />);
    expect(screen.getByText('😊')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<DayCell day={1} isToday={false} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('has correct aria-label for today and deed', () => {
    render(<DayCell day={15} isToday={true} deedIcon="⭐" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'День 15 (сегодня), доброе дело: ⭐');
  });
}); 