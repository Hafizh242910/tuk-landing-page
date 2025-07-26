"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DeleteButton({
  id,
  endpoint,
  redirectPath,
  itemName = "item",
  onSuccess,
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        `Apakah Anda yakin ingin menghapus ${itemName} ini? Tindakan ini tidak dapat dibatalkan.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        if (onSuccess) {
          onSuccess();
        } else if (redirectPath) {
          router.push(redirectPath);
          router.refresh();
          setDeleting(true);
        }
      } else {
        const error = await response.json();
        alert(error.message || `Terjadi kesalahan saat menghapus ${itemName}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Terjadi kesalahan saat menghapus ${itemName}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={deleting}
    >
      {deleting ? "Menghapus..." : "Hapus"}
    </Button>
  );
}
