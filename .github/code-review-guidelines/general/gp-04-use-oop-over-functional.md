# GP-4: Use Object-Oriented Design Over Functional Programming

**Severity:** `[CRITICAL]`

## Principle

Encapsulate related data and behavior in classes. Use object-oriented programming to model domain concepts with clear responsibilities. Avoid large files with utility functions that operate on data structures.

## Why This Matters

- **Encapsulation**: Data and behavior that belong together stay together
- **Discoverability**: Methods are discovered through IDE autocomplete
- **Type Safety**: Better TypeScript inference with methods vs. passing objects to functions
- **Maintainability**: Changes to entity behavior are localized to one class
- **Testability**: Easier to mock and test class behavior

## Bad Example: Functional/Utility Approach

```typescript
// excel-parser.ts - 500+ line file with utility functions

export function parseExcel(filePath: string): any {
  const workbook = readFile(filePath);
  const sheets = [];

  for (let i = 0; i < workbook.SheetNames.length; i++) {
    const sheetData = parseSheet(workbook, i);
    sheets.push(sheetData);
  }

  return sheets;
}

export function parseSheet(workbook: any, index: number): any {
  const sheetName = workbook.SheetNames[index];
  const worksheet = workbook.Sheets[sheetName];
  const rows = [];

  for (const cellAddress in worksheet) {
    if (cellAddress[0] === '!') continue;
    const row = parseRow(worksheet, cellAddress);
    rows.push(row);
  }

  return { name: sheetName, rows };
}

export function parseRow(worksheet: any, cellAddress: string): any {
  // ... complex parsing logic
}

export function getCellValue(worksheet: any, cell: string): any {
  // ... cell parsing logic
}

export function getCellFormula(worksheet: any, cell: string): string | null {
  // ... formula extraction
}

export function validateSheetStructure(sheet: any, expectedColumns: string[]): boolean {
  // ... validation logic
}

// Usage - requires knowing all the functions and their order
const sheets = parseExcel('/path/to/file.xlsx');
const firstSheet = sheets[0];
const isValid = validateSheetStructure(firstSheet, ['Name', 'Email', 'Phone']);
```

**Problems:**
- Functions scattered across file, hard to discover related operations
- No encapsulation - raw data structures passed around
- Hard to extend (e.g., adding Excel formatting support)
- No type safety - everything is `any`
- Difficult to test in isolation
- No clear ownership of logic

## Good Example: Object-Oriented Approach

```typescript
// excel.ts
export class Excel {
  private workbook: any;
  private sheets: Sheet[];

  constructor(filePath: string) {
    this.workbook = this.loadWorkbook(filePath);
    this.sheets = this.parseSheets();
  }

  private loadWorkbook(filePath: string): any {
    // Workbook loading logic
    return XLSX.readFile(filePath);
  }

  private parseSheets(): Sheet[] {
    return this.workbook.SheetNames.map((name: string, index: number) => {
      return new Sheet(this.workbook.Sheets[name], name, index);
    });
  }

  getSheet(index: number): Sheet {
    if (index < 0 || index >= this.sheets.length) {
      throw new Error(`Sheet index ${index} out of bounds`);
    }
    return this.sheets[index];
  }

  getSheetByName(name: string): Sheet | null {
    return this.sheets.find(sheet => sheet.getName() === name) || null;
  }

  getAllSheets(): Sheet[] {
    return [...this.sheets];
  }

  getSheetCount(): number {
    return this.sheets.length;
  }
}

// sheet.ts
export class Sheet {
  private rawData: any;
  private name: string;
  private index: number;
  private rows: Row[];

  constructor(rawData: any, name: string, index: number) {
    this.rawData = rawData;
    this.name = name;
    this.index = index;
    this.rows = this.parseRows();
  }

  private parseRows(): Row[] {
    const rows: Row[] = [];
    const range = XLSX.utils.decode_range(this.rawData['!ref'] || 'A1');

    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      const row = new Row(this.rawData, rowNum, range.e.c + 1);
      rows.push(row);
    }

    return rows;
  }

  getName(): string {
    return this.name;
  }

  getIndex(): number {
    return this.index;
  }

  getRows(): Row[] {
    return [...this.rows];
  }

  getRow(index: number): Row {
    if (index < 0 || index >= this.rows.length) {
      throw new Error(`Row index ${index} out of bounds`);
    }
    return this.rows[index];
  }

  getRowCount(): number {
    return this.rows.length;
  }

  getHeaders(): string[] {
    if (this.rows.length === 0) return [];
    return this.rows[0].getCells().map(cell => cell.getValue().toString());
  }

  validate(expectedColumns: string[]): ValidationResult {
    const headers = this.getHeaders();
    const missing = expectedColumns.filter(col => !headers.includes(col));
    const extra = headers.filter(col => !expectedColumns.includes(col));

    return {
      isValid: missing.length === 0,
      missingColumns: missing,
      extraColumns: extra,
    };
  }

  toJSON(): any[] {
    const headers = this.getHeaders();
    return this.rows.slice(1).map(row => {
      const obj: any = {};
      row.getCells().forEach((cell, index) => {
        if (headers[index]) {
          obj[headers[index]] = cell.getValue();
        }
      });
      return obj;
    });
  }
}

// row.ts
export class Row {
  private cells: Cell[];
  private rowNumber: number;

  constructor(worksheet: any, rowNumber: number, columnCount: number) {
    this.rowNumber = rowNumber;
    this.cells = this.parseCells(worksheet, rowNumber, columnCount);
  }

  private parseCells(worksheet: any, rowNumber: number, columnCount: number): Cell[] {
    const cells: Cell[] = [];

    for (let col = 0; col < columnCount; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: rowNumber, c: col });
      const cellData = worksheet[cellAddress];
      cells.push(new Cell(cellData, cellAddress));
    }

    return cells;
  }

  getCells(): Cell[] {
    return [...this.cells];
  }

  getCell(columnIndex: number): Cell {
    if (columnIndex < 0 || columnIndex >= this.cells.length) {
      throw new Error(`Column index ${columnIndex} out of bounds`);
    }
    return this.cells[columnIndex];
  }

  getCellCount(): number {
    return this.cells.length;
  }

  getRowNumber(): number {
    return this.rowNumber;
  }

  isEmpty(): boolean {
    return this.cells.every(cell => cell.isEmpty());
  }

  toArray(): any[] {
    return this.cells.map(cell => cell.getValue());
  }
}

// cell.ts
export class Cell {
  private rawData: any;
  private address: string;

  constructor(rawData: any, address: string) {
    this.rawData = rawData;
    this.address = address;
  }

  getValue(): string | number | boolean | null {
    if (!this.rawData) return null;

    switch (this.rawData.t) {
      case 's': // string
        return this.rawData.v;
      case 'n': // number
        return this.rawData.v;
      case 'b': // boolean
        return this.rawData.v;
      case 'e': // error
        return null;
      default:
        return this.rawData.v;
    }
  }

  getFormula(): string | null {
    return this.rawData?.f || null;
  }

  getFormattedValue(): string {
    if (!this.rawData) return '';
    return this.rawData.w || this.getValue()?.toString() || '';
  }

  getAddress(): string {
    return this.address;
  }

  getType(): 'string' | 'number' | 'boolean' | 'error' | 'empty' {
    if (!this.rawData) return 'empty';

    switch (this.rawData.t) {
      case 's': return 'string';
      case 'n': return 'number';
      case 'b': return 'boolean';
      case 'e': return 'error';
      default: return 'empty';
    }
  }

  isEmpty(): boolean {
    return !this.rawData || this.rawData.v === null || this.rawData.v === '';
  }

  isFormula(): boolean {
    return this.rawData?.f !== undefined;
  }
}

// Usage - discoverable, type-safe, clean
const excel = new Excel('/path/to/file.xlsx');
const sheet = excel.getSheet(0);

// Validation
const validationResult = sheet.validate(['Name', 'Email', 'Phone']);
if (!validationResult.isValid) {
  console.error('Missing columns:', validationResult.missingColumns);
}

// Easy data access with autocomplete
const headers = sheet.getHeaders();
const rows = sheet.getRows();

for (const row of rows) {
  const cells = row.getCells();
  for (const cell of cells) {
    if (cell.isFormula()) {
      console.log(`Formula: ${cell.getFormula()}`);
    }
    console.log(`Value: ${cell.getValue()}`);
  }
}

// Convert to JSON
const data = sheet.toJSON();
```

**Benefits:**
- **Clear structure**: Excel → Sheet → Row → Cell hierarchy
- **Encapsulation**: Each class owns its data and behavior
- **Type safety**: Full TypeScript support with autocomplete
- **Extensibility**: Easy to add new methods (e.g., `cell.getStyle()`)
- **Testability**: Each class can be tested independently
- **Discoverability**: IDE shows available methods
- **Error handling**: Centralized in each class
- **Reusability**: Classes can be used in different contexts

## When OOP Is Appropriate

### 1. Domain Entities

```typescript
// ✅ Good - model business entities as classes
class User {
  constructor(
    private id: string,
    private email: string,
    private role: UserRole,
    private createdAt: Date
  ) {}

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  canEditPost(post: Post): boolean {
    return this.isAdmin() || post.authorId === this.id;
  }

  getAccountAge(): number {
    return Date.now() - this.createdAt.getTime();
  }
}
```

### 2. Complex Data Structures

```typescript
// ✅ Good - encapsulate complex behavior
class PaginatedResult<T> {
  constructor(
    private items: T[],
    private total: number,
    private page: number,
    private pageSize: number
  ) {}

  getItems(): T[] {
    return [...this.items];
  }

  getTotalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  hasNextPage(): boolean {
    return this.page < this.getTotalPages();
  }

  hasPreviousPage(): boolean {
    return this.page > 1;
  }

  getNextPage(): number | null {
    return this.hasNextPage() ? this.page + 1 : null;
  }

  getPreviousPage(): number | null {
    return this.hasPreviousPage() ? this.page - 1 : null;
  }
}
```

### 3. Stateful Operations

```typescript
// ✅ Good - manage state in a class
class FormValidator {
  private errors: Map<string, string[]> = new Map();

  validateRequired(field: string, value: any): this {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      this.addError(field, `${field} is required`);
    }
    return this;
  }

  validateEmail(field: string, value: string): this {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      this.addError(field, `${field} must be a valid email`);
    }
    return this;
  }

  private addError(field: string, message: string): void {
    const fieldErrors = this.errors.get(field) || [];
    fieldErrors.push(message);
    this.errors.set(field, fieldErrors);
  }

  isValid(): boolean {
    return this.errors.size === 0;
  }

  getErrors(): Record<string, string[]> {
    return Object.fromEntries(this.errors);
  }
}
```

## When Functional Is Acceptable

Pure utility functions for cross-cutting concerns:

```typescript
// ✅ Acceptable - pure utility functions
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
```

## Review Checklist

- [ ] Are there large utility files (>200 lines) operating on data structures?
- [ ] Could related functions be grouped into a class?
- [ ] Are data structures passed to many different functions?
- [ ] Would IDE autocomplete help discover related operations?
- [ ] Is the logic modeling a domain concept (User, Order, Payment)?
- [ ] Would encapsulation make the code more maintainable?
- [ ] Are there files like `user-utils.ts` that should be `user.ts` with a class?
