import { MatPaginatorIntl } from '@angular/material/paginator';

export function PaginatorConfig(label: string): string {
    const customPaginatorIntl = new MatPaginatorIntl();
    customPaginatorIntl.itemsPerPageLabel = label+' par page:';
    return customPaginatorIntl.itemsPerPageLabel;
}
