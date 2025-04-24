import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Mail } from 'lucide-react';

interface CustomerSupportLinksProps {
  chatLink?: string;
  phone?: string;
  email?: string;
}

const CustomerSupportLinks: React.FC<CustomerSupportLinksProps> = ({
  chatLink = '#',
  phone = '+1 (212) 970-4133',
  email = 'support@ironmangames.com',
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-4">
      <h4 className="text-sm font-semibold text-muted-foreground mr-2 hidden sm:block">Need Help?</h4>
      {chatLink && (
        <Button variant="outline" size="sm" asChild>
          <a href={chatLink}>
            <MessageSquare className="mr-2 h-4 w-4" /> Live Chat
          </a>
        </Button>
      )}
      {phone && (
        <Button variant="outline" size="sm" asChild>
          <a href={`tel:${phone}`}>
            <Phone className="mr-2 h-4 w-4" /> Call Us
          </a>
        </Button>
      )}
      {email && (
        <Button variant="outline" size="sm" asChild>
          <a href={`mailto:${email}`}>
            <Mail className="mr-2 h-4 w-4" /> Email Support
          </a>
        </Button>
      )}
    </div>
  );
};

export default CustomerSupportLinks;
