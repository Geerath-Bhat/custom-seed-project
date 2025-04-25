import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Download, ArrowUpDown, Filter } from 'lucide-react';
import { format } from 'date-fns'; // Using date-fns

type PaymentStatus = 'paid' | 'pending' | 'failed';

interface Payment {
  id: string;
  date: Date | string;
  amount: number;
  method: string; // e.g., 'Visa **** 1234'
  status: PaymentStatus;
  receiptUrl?: string;
}

interface PaymentHistoryTableProps {
  payments: Payment[];
}

type SortKey = 'date' | 'amount' | 'status';
type SortDirection = 'asc' | 'desc';

const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({ payments }) => {
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(null);
  const [statusFilter, setStatusFilter] = useState<PaymentStatus[]>([]);
  const [dateFilter, setDateFilter] = useState<string>(''); // Simple date string filter (e.g., YYYY-MM)

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedPayments = useMemo(() => {
    let filtered = [...payments];

    if (statusFilter.length > 0) {
      filtered = filtered.filter(p => statusFilter.includes(p.status));
    }

    if (dateFilter) {
       filtered = filtered.filter(p => format(new Date(p.date), 'yyyy-MM').startsWith(dateFilter));
    }

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        let aValue: string | number | Date = a[sortConfig.key];
        let bValue: string | number | Date = b[sortConfig.key];

        // Handle date sorting
        if (sortConfig.key === 'date') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filtered;
  }, [payments, sortConfig, statusFilter, dateFilter]);

  const getStatusBadgeVariant = (status: PaymentStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'paid': return 'default'; // Or success
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="w-full animate-fade-in">
       <h2 className="text-xl font-semibold text-foreground mb-4">Payment History</h2>
      <div className="flex items-center gap-2 mb-4">
         <Input
            placeholder="Filter by Date (YYYY-MM)..."
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="max-w-sm"
            type="month"
         />
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter Status
                {statusFilter.length > 0 && ` (${statusFilter.length})`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(['paid', 'pending', 'failed'] as PaymentStatus[]).map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={statusFilter.includes(status)}
                  onCheckedChange={(checked) => {
                    setStatusFilter(prev =>
                      checked ? [...prev, status] : prev.filter(s => s !== status)
                    );
                  }}
                  className="capitalize"
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
                 Date <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('amount')}>
                 Amount <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                 Status <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedPayments.length > 0 ? (
              filteredAndSortedPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{format(new Date(payment.date), 'PPP')}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(payment.status)} className="capitalize">{payment.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {payment.receiptUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" /> Receipt
                        </a>
                      </Button>
                    ) : (
                       <span className="text-xs text-muted-foreground">No Receipt</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No payment history found or matches filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
