<?php
/**
 * FRAMEWORK - INTERFACE - PDF - A
 * 
 * Garante a integridade dos métodos públicos e templates PDF tipo A
 * 
 * @pmonteiro (2020-03-02)
 */ 

namespace FWK\interfaces\pdf;

interface TemplateTypeAInterface {
        public const SUB_SECTION_STYLE_DEFAULT = 0;
        public const SUB_SECTION_STYLE_1 = 1;
        public const SUB_SECTION_STYLE_2 = 2;
        public function tplSetHeaderLogo(string $file_path): void;
        public function tplSetHeaderTitle(string $value): void; 
        public function tplSetHeaderSubTitle(string $value): void; 
        public function tplSetSignature(string $file_path, $name = ''): void;
        public function tplSetFooterCompany(string $value): void;
        public function tplSetOutput(bool $download, ?string $file_name = null, ?string $folder_path = null): void;
        public function tplProcess(): string;
        public function tplAddSection(string $title, array $values = array(), array $column_widths = array()): void;
        public function tplAddSubSectionTable(array $titles, array $values, array $column_widths, array $column_aligns, bool $isolated = false, ?int $style = null): void;
        public function tplAddSectionImages(string $title, array $values, int $columns): void;
        public function tplAddSubSectionImages(string $title, array $values, int $columns, ?int $style = null): void;
        public function tplReset(): void;
}
// --- END