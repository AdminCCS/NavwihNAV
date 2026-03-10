"use client";

import { useState } from "react";
import { Copy, Code, Check } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SnippetGeneratorPage() {
    const [objectType, setObjectType] = useState("table");
    const [objectId, setObjectId] = useState("50100");
    const [objectName, setObjectName] = useState("My Custom Table");
    const [copied, setCopied] = useState(false);

    const generateSnippet = () => {
        const safeName = objectName.replace(/[^a-zA-Z0-9 ]/g, "");

        if (objectType === "table") {
            return `table ${objectId} "${safeName}"\n{\n    DataClassification = CustomerContent;\n    \n    fields\n    {\n        field(1; "No."; Code[20])\n        {\n            DataClassification = CustomerContent;\n            Caption = 'No.';\n        }\n    }\n    \n    keys\n    {\n        key(PK; "No.")\n        {\n            Clustered = true;\n        }\n    }\n}`;
        } else if (objectType === "page") {
            return `page ${objectId} "${safeName}"\n{\n    PageType = List;\n    ApplicationArea = All;\n    UsageCategory = Lists;\n    SourceTable = "${safeName}";\n    \n    layout\n    {\n        area(Content)\n        {\n            repeater(GroupName)\n            {\n                field("No."; Rec."No.")\n                {\n                    ApplicationArea = All;\n                }\n            }\n        }\n    }\n}`;
        } else if (objectType === "codeunit") {
            return `codeunit ${objectId} "${safeName}"\n{\n    trigger OnRun()\n    begin\n        // Your code here\n    end;\n}`;
        }
        return "";
    };

    const codeSnippet = generateSnippet();

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl flex-1">
            <Link href="/tools" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
            </Link>

            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                    <Code className="h-8 w-8 text-primary" /> AL Code Snippet Generator
                </h1>
                <p className="text-muted-foreground">
                    Quickly generate boilerplates for your AL assignments.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 space-y-6 bg-muted/30 p-6 rounded-xl border border-border">
                    <div>
                        <label className="block text-sm font-medium mb-2">Object Type</label>
                        <select
                            value={objectType}
                            onChange={(e) => setObjectType(e.target.value)}
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="table">Table</option>
                            <option value="page">Page</option>
                            <option value="codeunit">Codeunit</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Object ID</label>
                        <input
                            type="number"
                            value={objectId}
                            onChange={(e) => setObjectId(e.target.value)}
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Object Name</label>
                        <input
                            type="text"
                            value={objectName}
                            onChange={(e) => setObjectName(e.target.value)}
                            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2 relative">
                    <div className="absolute right-4 top-4">
                        <button
                            onClick={handleCopy}
                            className="p-2 bg-muted/80 hover:bg-muted text-foreground rounded-md transition-colors border border-border flex items-center gap-2 text-xs font-medium"
                        >
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            {copied ? "Copied!" : "Copy Code"}
                        </button>
                    </div>
                    <pre className="bg-[#1e1e1e] text-orange-200 p-6 rounded-xl overflow-x-auto border border-border h-full min-h-[400px]">
                        <code className="text-sm font-mono whitespace-pre">{codeSnippet}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
