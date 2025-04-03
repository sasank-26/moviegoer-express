
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  bucketName: string;
  filePath: string;
  onUploadComplete: (url: string) => void;
}

const SupabaseImageUpload: React.FC<ImageUploadProps> = ({ bucketName, filePath, onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const fullPath = `${filePath}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fullPath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fullPath);

      onUploadComplete(data.publicUrl);
      toast.success('Image uploaded successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Error uploading image');
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="cursor-pointer">
        <div className="flex items-center justify-center bg-netflix-gray hover:bg-netflix-light-gray/30 text-netflix-white py-2 px-4 rounded">
          <Upload size={16} className="mr-2" />
          <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            disabled={uploading}
            className="hidden"
          />
        </div>
      </label>
    </div>
  );
};

export default SupabaseImageUpload;
