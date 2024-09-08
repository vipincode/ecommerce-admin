import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='p-4'>
      <h1>Hello, Admin dashboard</h1>
      <Button
        size='sm'
        variant='destructive'
      >
        Save
      </Button>
    </div>
  );
}
