import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Placeholder data structure
interface SectorMover {
  id: string;
  name: string;
  change: number; // Percentage change
  volume: number;
}

interface SectorMoversTableProps {
  movers: SectorMover[];
  title?: string;
  defaultSortField?: keyof SectorMover;
  defaultSortDirection?: 'asc' | 'desc';
}

const SectorMoversTable: React.FC<SectorMoversTableProps> = ({
  movers,
  title = 'Top Sector Movers',
  defaultSortField = 'change',
  defaultSortDirection = 'desc',
}) => {
  const [sortField, setSortField] = useState<keyof SectorMover>(defaultSortField);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSortDirection);

  const handleSort = (field: keyof SectorMover) => {
    const newDirection = sortField === field && sortDirection === 'desc' ? 'asc' : 'desc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  const sortedMovers = [...movers].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    let comparison = 0;
    if (fieldA > fieldB) {
      comparison = 1;
    } else if (fieldA < fieldB) {
      comparison = -1;
    }

    return sortDirection === 'desc' ? comparison * -1 : comparison;
  });

  const SortableHeader: React.FC<{ field: keyof SectorMover; label: string }> = ({ field, label }) => (
    <TableHead className="cursor-pointer" onClick={() => handleSort(field)}>
      <div className="flex items-center">
        {label}
        {sortField === field && <ArrowUpDown className="ml-2 h-4 w-4" />}
      </div>
    </TableHead>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader field="name" label="Sector Name" />
              <SortableHeader field="change" label="Change (%)" />
              <SortableHeader field="volume" label="Volume" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMovers.length > 0 ? (
              sortedMovers.map((mover) => (
                <TableRow key={mover.id} className="hover:bg-muted/50 cursor-pointer">
                  <TableCell className="font-medium text-foreground">{mover.name}</TableCell>
                  <TableCell className={mover.change >= 0 ? 'text-success' : 'text-destructive'}>
                    {mover.change >= 0 ? '+' : ''}{mover.change.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-muted-foreground">{mover.volume.toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  No sector movers data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Add default props for demonstration
SectorMoversTable.defaultProps = {
    movers: [
        { id: 'tech', name: 'Technology', change: 1.85, volume: 150000000 },
        { id: 'energy', name: 'Energy', change: 2.5, volume: 95000000 },
        { id: 'realestate', name: 'Real Estate', change: 1.1, volume: 60000000 },
        { id: 'industrials', name: 'Industrials', change: 0.75, volume: 80000000 },
        { id: 'financials', name: 'Financials', change: 0.2, volume: 120000000 },
        { id: 'utils', name: 'Utilities', change: -0.1, volume: 45000000 },
        { id: 'healthcare', name: 'Healthcare', change: -0.5, volume: 110000000 },
        { id: 'consumer', name: 'Consumer Discretionary', change: -1.9, volume: 70000000 },
    ]
}

export default SectorMoversTable;
